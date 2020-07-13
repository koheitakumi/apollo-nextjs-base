import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "libs/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
