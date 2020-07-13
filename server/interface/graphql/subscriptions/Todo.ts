import { SubscriptionResolvers } from "../generated/graphql";
import { withFilter } from "graphql-subscriptions";

const TODO_ADDED = "TODO_ADDED";

export const Subscription: SubscriptionResolvers = {
  todoAdded: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator([TODO_ADDED]),
      (payload, variables, { user }) => {
        //TODO something need to reduce
        return true;
      }
    ),
  },
};
