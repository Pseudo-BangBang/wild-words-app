import { db } from "../connection";
import { User, CreateUserInput } from "../../types";

export interface CreateUserWithPasswordInput extends CreateUserInput {
  passwordHash: string;
}

export class UserRepository {
  async findAll(): Promise<User[]> {
    try {
      const users = await db("users").select("*").orderBy("created_at", "desc");

      return users.map(this.mapToUser);
    } catch (error) {
      throw new Error(
        `Failed to fetch users: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const user = await db("users").select("*").where("id", id).first();

      return user ? this.mapToUser(user) : null;
    } catch (error) {
      throw new Error(
        `Failed to fetch user with id ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await db("users").select("*").where("email", email).first();

      return user ? this.mapToUser(user) : null;
    } catch (error) {
      throw new Error(
        `Failed to fetch user with email ${email}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async create(input: CreateUserInput): Promise<User> {
    try {
      const [id] = await db("users").insert({
        email: input.email,
        name: input.name,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user = await this.findById(id);
      if (!user) {
        throw new Error("Failed to create user");
      }

      return user;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Duplicate entry")) {
        throw new Error("User with this email already exists");
      }
      throw new Error(
        `Failed to create user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async createWithPassword(input: CreateUserWithPasswordInput): Promise<User> {
    try {
      const [id] = await db("users").insert({
        email: input.email,
        name: input.name,
        password_hash: input.passwordHash,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user = await this.findById(id);
      if (!user) {
        throw new Error("Failed to create user");
      }

      return user;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Duplicate entry")) {
        throw new Error("User with this email already exists");
      }
      throw new Error(
        `Failed to create user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async update(
    id: number,
    updates: Partial<CreateUserInput>
  ): Promise<User | null> {
    try {
      const updateData: any = {
        ...updates,
        updated_at: new Date(),
      };

      const updated = await db("users").where("id", id).update(updateData);

      if (updated === 0) {
        return null;
      }

      return await this.findById(id);
    } catch (error) {
      throw new Error(
        `Failed to update user with id ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const deleted = await db("users").where("id", id).del();

      return deleted > 0;
    } catch (error) {
      throw new Error(
        `Failed to delete user with id ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private mapToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      passwordHash: row.password_hash,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
