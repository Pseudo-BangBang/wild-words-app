import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_POSTS,
  GET_PUBLISHED_POSTS,
  GET_POSTS_BY_AUTHOR,
} from "@/graphql/queries";
import { CREATE_POST, UPDATE_POST, DELETE_POST } from "@/graphql/mutations";
import {
  Post,
  CreatePostInput,
  UpdatePostInput,
  PaginationArgs,
} from "@/types";

interface UsePostsOptions {
  authorId?: string;
  publishedOnly?: boolean;
  pagination?: PaginationArgs;
}

export const usePosts = (options: UsePostsOptions = {}) => {
  const {
    authorId,
    publishedOnly = false,
    pagination = { limit: 10, offset: 0 },
  } = options;

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Choose the appropriate query based on options
  const query = authorId
    ? GET_POSTS_BY_AUTHOR
    : publishedOnly
    ? GET_PUBLISHED_POSTS
    : GET_POSTS;

  const queryVariables = authorId ? { authorId, pagination } : { pagination };

  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: queryVariables,
    errorPolicy: "all",
  });

  const [createPostMutation] = useMutation(CREATE_POST, {
    refetchQueries: [
      {
        query: GET_POSTS,
        variables: { pagination: { limit: 10, offset: 0 } },
      },
      {
        query: GET_PUBLISHED_POSTS,
        variables: { pagination: { limit: 10, offset: 0 } },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [updatePostMutation] = useMutation(UPDATE_POST, {
    refetchQueries: [GET_POSTS, GET_PUBLISHED_POSTS],
  });

  const [deletePostMutation] = useMutation(DELETE_POST, {
    refetchQueries: [GET_POSTS, GET_PUBLISHED_POSTS],
  });

  const posts =
    data?.posts?.posts ||
    data?.publishedPosts?.posts ||
    data?.postsByAuthor?.posts ||
    [];
  const totalCount =
    data?.posts?.totalCount ||
    data?.publishedPosts?.totalCount ||
    data?.postsByAuthor?.totalCount ||
    0;
  const hasMore =
    data?.posts?.hasMore ||
    data?.publishedPosts?.hasMore ||
    data?.postsByAuthor?.hasMore ||
    false;

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    const nextOffset = nextPage * (pagination.limit || 10);

    try {
      await fetchMore({
        variables: {
          ...queryVariables,
          pagination: {
            ...pagination,
            offset: nextOffset,
          },
        },
      });
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    hasMore,
    isLoadingMore,
    currentPage,
    pagination,
    queryVariables,
    fetchMore,
  ]);

  const createPost = useCallback(
    async (input: CreatePostInput): Promise<Post> => {
      try {
        const result = await createPostMutation({
          variables: { input },
        });
        return result.data.createPost;
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },
    [createPostMutation]
  );

  const updatePost = useCallback(
    async (input: UpdatePostInput): Promise<Post | null> => {
      try {
        const result = await updatePostMutation({
          variables: { input },
        });
        return result.data.updatePost;
      } catch (error) {
        console.error("Error updating post:", error);
        throw error;
      }
    },
    [updatePostMutation]
  );

  const deletePost = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const result = await deletePostMutation({
          variables: { id },
        });
        return result.data.deletePost;
      } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
      }
    },
    [deletePostMutation]
  );

  return {
    posts,
    totalCount,
    hasMore,
    loading,
    error,
    isLoadingMore,
    loadMore,
    createPost,
    updatePost,
    deletePost,
  };
};
