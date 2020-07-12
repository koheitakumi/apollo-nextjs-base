import { SubscriptionResolvers } from "../generated/graphql";

const TODO_ADDED = "TODO_ADDED";

export const Subscription: SubscriptionResolvers = {
  todoAdded: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([TODO_ADDED]),
  },
};
