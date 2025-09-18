export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  posts?: Post[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author?: User;
}

export interface PostConnection {
  posts: Post[];
  totalCount: number;
  hasMore: boolean;
}

export interface CreateUserInput {
  email: string;
  name: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
  published?: boolean;
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
  published?: boolean;
}

export interface PaginationArgs {
  limit?: number;
  offset?: number;
}
