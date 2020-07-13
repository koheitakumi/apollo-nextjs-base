import { AuthenticationError } from "apollo-server-express";
import { MutationResolvers } from "../generated/graphql";

const TODO_ADDED = "TODO_ADDED";

export const Mutation: MutationResolvers = {
  async addTodo(_parent, args, { dataSources, user, pubsub }, _info) {
    if (!user) {
      throw new AuthenticationError("Authentication is necessary");
    }
    const { content, email } = args.todo;
    const newTodo = await dataSources.todoDb.addTodo(content, email);
    pubsub.publish(TODO_ADDED, { todoAdded: newTodo });
    return newTodo;
  },
  async deleteTodo(_parent, args, { dataSources, user }, _info) {
    if (!user) {
      throw new AuthenticationError("Authentication is necessary");
    }
    return dataSources.todoDb.deleteTodo(args.id);
  },
};
