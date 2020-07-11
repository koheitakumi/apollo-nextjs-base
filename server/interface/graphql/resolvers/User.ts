import { UserResolvers } from "../generated/graphql";

export const User: UserResolvers = {
  name: (user) => user.name,
};
