import { GraphQLScalarType, Kind } from "graphql";
import { UserRepository } from "../database/repositories/UserRepository";
import { PostRepository } from "../database/repositories/PostRepository";
import { authResolvers } from "../resolvers/auth";
import {
  User,
  Post,
  CreateUserInput,
  CreatePostInput,
  UpdatePostInput,
  PaginationArgs,
} from "../types";

// Custom Date scalar
const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: unknown) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return null;
  },
  parseValue(value: unknown) {
    if (typeof value === "string") {
      return new Date(value);
    }
    return null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

// Repository instances
const userRepository = new UserRepository();
const postRepository = new PostRepository();

export const resolvers = {
  Date: DateScalar,

  Query: {
    // Auth queries
    ...authResolvers.Query,
    // User queries
    users: async (): Promise<User[]> => {
      return await userRepository.findAll();
    },

    user: async (_: any, { id }: { id: string }): Promise<User | null> => {
      return await userRepository.findById(parseInt(id));
    },

    userByEmail: async (
      _: any,
      { email }: { email: string }
    ): Promise<User | null> => {
      return await userRepository.findByEmail(email);
    },

    // Post queries
    posts: async (_: any, { pagination }: { pagination?: PaginationArgs }) => {
      return await postRepository.findAll(pagination);
    },

    post: async (_: any, { id }: { id: string }): Promise<Post | null> => {
      return await postRepository.findById(parseInt(id));
    },

    postsByAuthor: async (
      _: any,
      {
        authorId,
        pagination,
      }: { authorId: string; pagination?: PaginationArgs }
    ) => {
      return await postRepository.findByAuthorId(
        parseInt(authorId),
        pagination
      );
    },

    publishedPosts: async (
      _: any,
      { pagination }: { pagination?: PaginationArgs }
    ) => {
      return await postRepository.findPublished(pagination);
    },
  },

  Mutation: {
    // Auth mutations
    ...authResolvers.Mutation,
    // User mutations
    createUser: async (
      _: any,
      { input }: { input: CreateUserInput }
    ): Promise<User> => {
      return await userRepository.create(input);
    },

    updateUser: async (
      _: any,
      { id, input }: { id: string; input: CreateUserInput }
    ): Promise<User | null> => {
      return await userRepository.update(parseInt(id), input);
    },

    deleteUser: async (_: any, { id }: { id: string }): Promise<boolean> => {
      return await userRepository.delete(parseInt(id));
    },

    // Post mutations
    createPost: async (
      _: any,
      { input }: { input: CreatePostInput }
    ): Promise<Post> => {
      return await postRepository.create({
        ...input,
        authorId: parseInt(input.authorId.toString()),
      });
    },

    updatePost: async (
      _: any,
      { input }: { input: UpdatePostInput }
    ): Promise<Post | null> => {
      return await postRepository.update({
        ...input,
        id: parseInt(input.id.toString()),
      });
    },

    deletePost: async (_: any, { id }: { id: string }): Promise<boolean> => {
      return await postRepository.delete(parseInt(id));
    },
  },

  // Field resolvers
  User: {
    posts: async (
      parent: User,
      { pagination }: { pagination?: PaginationArgs }
    ) => {
      const result = await postRepository.findByAuthorId(parent.id, pagination);
      return result.posts;
    },
  },

  Post: {
    author: async (parent: Post): Promise<User | null> => {
      if (parent.author) {
        return parent.author;
      }
      return await userRepository.findById(parent.authorId);
    },
  },
};
