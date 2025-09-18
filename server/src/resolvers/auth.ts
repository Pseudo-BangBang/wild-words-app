import {
  UserRepository,
  CreateUserWithPasswordInput,
} from "../database/repositories/UserRepository";
import { createToken } from "../utils/jwt";
import { User } from "../types";
import bcrypt from "bcrypt";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

export const authResolvers = {
  Mutation: {
    login: async (_: any, { input }: { input: LoginInput }) => {
      const { email, password } = input;
      try {
        const userRepository = new UserRepository();

        // Find user by email
        const user = await userRepository.findByEmail(email);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Verify password hash
        if (!user.passwordHash) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(
          password,
          user.passwordHash
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        const token = createToken(user);

        return {
          token,
          user,
        };
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
      }
    },

    register: async (_: any, { input }: { input: RegisterInput }) => {
      const { email, name, password } = input;
      try {
        const userRepository = new UserRepository();

        // Check if user already exists
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData: CreateUserWithPasswordInput = {
          email,
          name,
          passwordHash: hashedPassword,
        };

        const user = await userRepository.createWithPassword(userData);
        const token = createToken(user);

        return {
          token,
          user,
        };
      } catch (error) {
        console.error("Registration error:", error);
        throw new Error("Registration failed");
      }
    },
  },

  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.isAuthenticated || !context.user) {
        throw new Error("Not authenticated");
      }
      return context.user;
    },
  },
};
