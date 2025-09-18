import { db } from "../connection";
import {
  Post,
  CreatePostInput,
  UpdatePostInput,
  PaginationArgs,
  PostConnection,
} from "../../types";

export class PostRepository {
  async findAll(args?: PaginationArgs): Promise<PostConnection> {
    try {
      const limit = args?.limit || 10;
      const offset = args?.offset || 0;

      // Get total count
      const [{ count }] = await db("posts").count("id as count");
      const totalCount = Number(count);

      // Get posts with author information
      const posts = await db("posts")
        .select(
          "posts.*",
          "users.id as author_id",
          "users.email as author_email",
          "users.name as author_name",
          "users.created_at as author_created_at",
          "users.updated_at as author_updated_at"
        )
        .leftJoin("users", "posts.author_id", "users.id")
        .orderBy("posts.created_at", "desc")
        .limit(limit)
        .offset(offset);

      return {
        posts: posts.map(this.mapToPost),
        totalCount,
        hasMore: offset + limit < totalCount,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch posts: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async findById(id: number): Promise<Post | null> {
    try {
      const post = await db("posts")
        .select(
          "posts.*",
          "users.id as author_id",
          "users.email as author_email",
          "users.name as author_name",
          "users.created_at as author_created_at",
          "users.updated_at as author_updated_at"
        )
        .leftJoin("users", "posts.author_id", "users.id")
        .where("posts.id", id)
        .first();

      return post ? this.mapToPost(post) : null;
    } catch (error) {
      throw new Error(
        `Failed to fetch post with id ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async findByAuthorId(
    authorId: number,
    args?: PaginationArgs
  ): Promise<PostConnection> {
    try {
      const limit = args?.limit || 10;
      const offset = args?.offset || 0;

      // Get total count for this author
      const [{ count }] = await db("posts")
        .count("id as count")
        .where("author_id", authorId);
      const totalCount = Number(count);

      // Get posts for this author
      const posts = await db("posts")
        .select(
          "posts.*",
          "users.id as author_id",
          "users.email as author_email",
          "users.name as author_name",
          "users.created_at as author_created_at",
          "users.updated_at as author_updated_at"
        )
        .leftJoin("users", "posts.author_id", "users.id")
        .where("posts.author_id", authorId)
        .orderBy("posts.created_at", "desc")
        .limit(limit)
        .offset(offset);

      return {
        posts: posts.map(this.mapToPost),
        totalCount,
        hasMore: offset + limit < totalCount,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch posts for author ${authorId}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async findPublished(args?: PaginationArgs): Promise<PostConnection> {
    try {
      const limit = args?.limit || 10;
      const offset = args?.offset || 0;

      // Get total count of published posts
      const [{ count }] = await db("posts")
        .count("id as count")
        .where("published", true);
      const totalCount = Number(count);

      // Get published posts
      const posts = await db("posts")
        .select(
          "posts.*",
          "users.id as author_id",
          "users.email as author_email",
          "users.name as author_name",
          "users.created_at as author_created_at",
          "users.updated_at as author_updated_at"
        )
        .leftJoin("users", "posts.author_id", "users.id")
        .where("posts.published", true)
        .orderBy("posts.created_at", "desc")
        .limit(limit)
        .offset(offset);

      return {
        posts: posts.map(this.mapToPost),
        totalCount,
        hasMore: offset + limit < totalCount,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch published posts: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async create(input: CreatePostInput): Promise<Post> {
    try {
      const [id] = await db("posts").insert({
        title: input.title,
        content: input.content,
        author_id: input.authorId,
        published: input.published || false,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const post = await this.findById(id);
      if (!post) {
        throw new Error("Failed to create post");
      }

      return post;
    } catch (error) {
      throw new Error(
        `Failed to create post: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async update(input: UpdatePostInput): Promise<Post | null> {
    try {
      const updateData: any = {
        updated_at: new Date(),
      };

      if (input.title !== undefined) updateData.title = input.title;
      if (input.content !== undefined) updateData.content = input.content;
      if (input.published !== undefined) updateData.published = input.published;

      const updated = await db("posts")
        .where("id", input.id)
        .update(updateData);

      if (updated === 0) {
        return null;
      }

      return await this.findById(input.id);
    } catch (error) {
      throw new Error(
        `Failed to update post with id ${input.id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const deleted = await db("posts").where("id", id).del();

      return deleted > 0;
    } catch (error) {
      throw new Error(
        `Failed to delete post with id ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private mapToPost(row: any): Post {
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      authorId: row.author_id,
      published: Boolean(row.published),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      author: row.author_id
        ? {
            id: row.author_id,
            email: row.author_email,
            name: row.author_name,
            createdAt: row.author_created_at,
            updatedAt: row.author_updated_at,
          }
        : undefined,
    };
  }
}
