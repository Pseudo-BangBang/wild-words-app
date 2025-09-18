import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ["pagination"],
            merge(existing, incoming) {
              if (!existing) return incoming;
              if (incoming.pagination && incoming.pagination.offset === 0) {
                return incoming;
              }
              return {
                ...incoming,
                posts: [...existing.posts, ...incoming.posts],
              };
            },
          },
          publishedPosts: {
            keyArgs: ["pagination"],
            merge(existing, incoming) {
              if (!existing) return incoming;
              if (incoming.pagination && incoming.pagination.offset === 0) {
                return incoming;
              }
              return {
                ...incoming,
                posts: [...existing.posts, ...incoming.posts],
              };
            },
          },
          postsByAuthor: {
            keyArgs: ["authorId", "pagination"],
            merge(existing, incoming) {
              if (!existing) return incoming;
              return {
                ...incoming,
                posts: [...existing.posts, ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});
