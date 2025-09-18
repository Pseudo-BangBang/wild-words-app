export interface User {
  id: number;
  email: string;
  name: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

export interface CreateUserInput {
  email: string;
  name: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: number;
  published?: boolean;
}

export interface UpdatePostInput {
  id: number;
  title?: string;
  content?: string;
  published?: boolean;
}

export interface AuthContext {
  user?: User;
  isAuthenticated: boolean;
}

export interface PaginationArgs {
  limit?: number;
  offset?: number;
}

export interface PostConnection {
  posts: Post[];
  totalCount: number;
  hasMore: boolean;
}
