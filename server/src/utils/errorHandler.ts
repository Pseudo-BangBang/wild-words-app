import {
  ApolloError,
  UserInputError,
  ForbiddenError,
} from "apollo-server-errors";

export class AppError extends Error {
  public code: string;
  public statusCode: number;

  constructor(
    message: string,
    code: string = "INTERNAL_ERROR",
    statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const handleError = (error: unknown): ApolloError => {
  if (error instanceof AppError) {
    switch (error.statusCode) {
      case 400:
        return new UserInputError(error.message, { code: error.code });
      case 403:
        return new ForbiddenError(error.message);
      default:
        return new ApolloError(error.message, error.code);
    }
  }

  if (error instanceof Error) {
    return new ApolloError(error.message, "INTERNAL_ERROR");
  }

  return new ApolloError("An unknown error occurred", "UNKNOWN_ERROR");
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: any, fieldName: string): void => {
  if (value === null || value === undefined || value === "") {
    throw new AppError(`${fieldName} is required`, "VALIDATION_ERROR", 400);
  }
};
