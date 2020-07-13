import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

//import { websocketLink } from "./ws";

export const createApolloClient = () => {
  const ssrMode = typeof window === "undefined";
  const httpLink = new HttpLink({
    uri: "/api/graphql",
    credentials: "same-origin",
    fetch,
  });
  if (ssrMode || !process.browser) {
    // On server
    return new ApolloClient({
      ssrMode,
      link: httpLink,
      cache: new InMemoryCache(),
    });
  } else {
    const { websocketLink } = require("./ws");
    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      websocketLink,
      httpLink
    );
    return new ApolloClient({
      ssrMode,
      link,
      cache: new InMemoryCache(),
    });
  }
};
