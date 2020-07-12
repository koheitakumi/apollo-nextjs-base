import { UserResolvers } from "../generated/graphql";

export const User: UserResolvers = {
  email: (user) => user.email,
  token: (user) => user.token,
};
