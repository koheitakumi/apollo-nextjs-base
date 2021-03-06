import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./interface/graphql/schema";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./constants";

import TodoDb from "./dataSources/TodoDb";
import UserDb from "./dataSources/UserDb";

import http from "http";

const pubsub = new PubSub();

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
const context = async ({ req, connection }) => {
  let user = null;
  try {
    const token = connection ? null : getTokenFromHeaders(req);
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
  return { req, user, pubsub };
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context,
  dataSources,
  // playground: false,
});

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server
httpServer.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
});
