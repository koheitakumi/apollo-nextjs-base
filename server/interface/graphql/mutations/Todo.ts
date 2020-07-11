import todoStore from "../../db/todoStore";
import { MutationResolvers } from "../generated/graphql";
import { isTest } from "apollo-utilities";

export const Mutation: MutationResolvers = {
  async addTodo(_parent, args, _context, _info) {
    return todoStore.addTodo(args.content);
  },
  async deleteTodo(_parent, args, _context, _info) {
    return todoStore.deleteTodo(args.id);
  },
};
