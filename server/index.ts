import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./interface/graphql/schema";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./constants";

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1];
  }
  return null;
};

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  //TODO Authentication
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

const server = new ApolloServer({ typeDefs, resolvers, context });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
