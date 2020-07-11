import { TodoResolvers } from "../generated/graphql";

export const Todo: TodoResolvers = {
  id: (todo) => todo.id,
  content: (todo) => todo.content,
};
