import { User } from "./types";
import { verifyToken, extractTokenFromHeader } from "./utils/jwt";
import { UserRepository } from "./database/repositories/UserRepository";

export interface Context {
  user?: User;
  isAuthenticated: boolean;
}

export const createContext = async ({
  req,
}: {
  req: any;
}): Promise<Context> => {
  try {
    // Extract JWT token from Authorization header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return {
        user: undefined,
        isAuthenticated: false,
      };
    }

    // Verify the JWT token
    const payload = verifyToken(token);
    if (!payload) {
      return {
        user: undefined,
        isAuthenticated: false,
      };
    }

    // Fetch user from database using the userId from the token
    const userRepository = new UserRepository();
    const user = await userRepository.findById(payload.userId);

    if (!user) {
      return {
        user: undefined,
        isAuthenticated: false,
      };
    }

    return {
      user,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("Error creating context:", error);
    return {
      user: undefined,
      isAuthenticated: false,
    };
  }
};
