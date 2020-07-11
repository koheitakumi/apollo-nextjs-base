import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./interface/graphql/schema";

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  //TODO Authentication
  console.log(req?.headers);
  return { req };
};

const server = new ApolloServer({ typeDefs, resolvers, context });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
