import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: Date!
    updatedAt: Date!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
    published: Boolean!
    createdAt: Date!
    updatedAt: Date!
    author: User
  }

  type PostConnection {
    posts: [Post!]!
    totalCount: Int!
    hasMore: Boolean!
  }

  input CreateUserInput {
    email: String!
    name: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    authorId: ID!
    published: Boolean
  }

  input UpdatePostInput {
    id: ID!
    title: String
    content: String
    published: Boolean
  }

  input PaginationArgs {
    limit: Int
    offset: Int
  }

  # Auth types
  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    name: String!
    password: String!
  }

  type Query {
    # Auth queries
    me: User

    # User queries
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User

    # Post queries
    posts(pagination: PaginationArgs): PostConnection!
    post(id: ID!): Post
    postsByAuthor(authorId: ID!, pagination: PaginationArgs): PostConnection!
    publishedPosts(pagination: PaginationArgs): PostConnection!
  }

  type Mutation {
    # Auth mutations
    login(input: LoginInput!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!

    # User mutations
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: CreateUserInput!): User
    deleteUser(id: ID!): Boolean!

    # Post mutations
    createPost(input: CreatePostInput!): Post!
    updatePost(input: UpdatePostInput!): Post
    deletePost(id: ID!): Boolean!
  }

  type Subscription {
    postCreated: Post!
    postUpdated: Post!
    postDeleted: ID!
  }
`;
