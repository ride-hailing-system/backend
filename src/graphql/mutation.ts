import { GraphQLObjectType } from "graphql";
import { userMutations } from "./mutation/userMutation";
import { authMutations } from "./mutation/authMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...authMutations
  },
});
