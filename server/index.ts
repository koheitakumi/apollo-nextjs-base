import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./interface/graphql/schema";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./constants";

import TodoDb from "./dataSources/TodoDb";
import UserDb from "./dataSources/UserDb";

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }
  return null;
};

// set up any dataSources our resolvers need
const dataSources = () => ({
  todoDb: new TodoDb(),
  userDb: new UserDb(),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  let user = null;
  const token = getTokenFromHeaders(req);
  try {
    if (token) {
      await verify(token, JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
          user = {
            email: decoded.email,
          };
        }
      });
    }
  } catch (err) {
    console.log("#error", err);
  }
  return { req, user };
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema, context, dataSources });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
