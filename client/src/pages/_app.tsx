import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

export default function App({ Component, pageProps }: AppProps) {
  const { HttpLink } = require("apollo-link-http");
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
