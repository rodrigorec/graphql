import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const GRAPHQL_URL = "http://localhost:9000/graphql";

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    for (const { message, locations, path } of graphQLErrors) {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);

    if (typeof window !== "undefined" && !window.navigator.onLine) {
      console.log("Sorry, your browser is offline.");
    } else {
      console.log("Some other network error occurred.");
    }
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        items: {
          merge(existing = [], incoming = []) {
            return [...incoming];
          },
        },
      },
    },
  },
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: from([
    errorLink,
    new HttpLink({
      uri: GRAPHQL_URL,
    }),
  ]),
});

export default client;
