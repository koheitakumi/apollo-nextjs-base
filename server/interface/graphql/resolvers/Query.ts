//import todoStore from "../../db/todoStore";
import { QueryResolvers } from "../generated/graphql";

export const Query: QueryResolvers = {
  hello: () => "Hello world!",
  todos: (_, __, { dataSources }) => dataSources.todoDb.getAllTodo(),
};
