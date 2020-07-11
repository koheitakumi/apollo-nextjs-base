import fs from "fs";
import path from "path";

// use generated file
export const typeDefs = fs
  .readFileSync(path.join(__dirname, "generated/schema.graphql"))
  .toString();

// Load mutations
const mutations = fs
  .readdirSync(path.join(__dirname, "mutations"))
  .map((file) => {
    return require("./mutations/" + file);
  })
  .reduce((acc, functions) => ({ ...acc, ...functions }), {});

// // Load resolvers
export const resolvers = fs
  .readdirSync(path.join(__dirname, "resolvers"))
  .map((file) => {
    return require("./resolvers/" + file);
  })
  .reduce((acc, functions) => ({ ...acc, ...functions }), mutations);
