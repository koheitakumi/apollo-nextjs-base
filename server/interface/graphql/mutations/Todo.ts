import { AuthenticationError } from "apollo-server-express";
//import todoStore from "../../db/todoStore";
import { MutationResolvers } from "../generated/graphql";

export const Mutation: MutationResolvers = {
  async addTodo(_parent, args, { dataSources, user }, _info) {
    if (!user) {
      throw new AuthenticationError("Authentication is necessary");
    }
    return dataSources.todoDb.addTodo(args.content);
  },
  async deleteTodo(_parent, args, { dataSources, user }, _info) {
    if (!user) {
      throw new AuthenticationError("Authentication is necessary");
    }
    return dataSources.todoDb.deleteTodo(args.id);
  },
};
