import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      name
      createdAt
      updatedAt
      posts {
        id
        title
        content
        published
        createdAt
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($pagination: PaginationArgs) {
    posts(pagination: $pagination) {
      posts {
        id
        title
        content
        authorId
        published
        createdAt
        updatedAt
        author {
          id
          name
          email
        }
      }
      totalCount
      hasMore
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      authorId
      published
      createdAt
      updatedAt
      author {
        id
        name
        email
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      id
      title
      content
      authorId
      published
      createdAt
      updatedAt
      author {
        id
        name
        email
      }
    }
  }
`;

export const GET_PUBLISHED_POSTS = gql`
  query GetPublishedPosts($pagination: PaginationArgs) {
    publishedPosts(pagination: $pagination) {
      posts {
        id
        title
        content
        authorId
        published
        createdAt
        updatedAt
        author {
          id
          name
          email
        }
      }
      totalCount
      hasMore
    }
  }
`;

export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: ID!, $pagination: PaginationArgs) {
    postsByAuthor(authorId: $authorId, pagination: $pagination) {
      posts {
        id
        title
        content
        authorId
        published
        createdAt
        updatedAt
        author {
          id
          name
          email
        }
      }
      totalCount
      hasMore
    }
  }
`;
