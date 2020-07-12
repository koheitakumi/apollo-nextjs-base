import { AuthenticationError } from "apollo-server-express";
import todoStore from "../../db/todoStore";
import { MutationResolvers, User } from "../generated/graphql";

export const Mutation: MutationResolvers = {
  async addTodo(_parent, args, { user }, _info) {
    if (!user) {
      throw new AuthenticationError("Authentication is necessary");
    }
    return todoStore.addTodo(args.content);
  },
  async deleteTodo(_parent, args, _context, _info) {
    return todoStore.deleteTodo(args.id);
  },
};
