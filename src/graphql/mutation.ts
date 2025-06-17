import { GraphQLObjectType } from "graphql";
import { userMutations } from "./mutation/userMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations
  },
});
