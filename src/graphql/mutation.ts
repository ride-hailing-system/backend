import { GraphQLObjectType } from "graphql";
import { userMutations } from "./mutation/userMutation";
import { authMutations } from "./mutation/authMutation";
import { driverMutations } from "./mutation/driverMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...authMutations,
    ...driverMutations
  },
});
