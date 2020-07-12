import path from "path";
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

// use generated file
const typesArray = loadFilesSync(path.join(__dirname, "./generated"), {
  extensions: ["graphql"],
});

export const typeDefs = mergeTypeDefs(typesArray, { all: true });

const mutationsArray = loadFilesSync(path.join(__dirname, "./mutations"), {
  extensions: ["ts"],
});

const resolversArray = loadFilesSync(path.join(__dirname, "./resolvers"), {
  extensions: ["ts"],
});

export const resolvers = mergeResolvers([...resolversArray, ...mutationsArray]);
