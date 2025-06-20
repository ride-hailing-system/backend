import { GraphQLObjectType } from "graphql";
import { userMutations } from "./mutation/userMutation";
import { authMutations } from "./mutation/authMutation";
import { driverMutations } from "./mutation/driverMutation";
import { vehicleMutations } from "./mutation/vehicleMutation";
import { paymentMutations } from "./mutation/paymentMutation";
import { rateMutations } from "./mutation/rateMutation";
import { rideMutations } from "./mutation/rideMutation";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutations,
    ...authMutations,
    ...driverMutations,
    ...vehicleMutations,
    ...paymentMutations,
    ...rateMutations,
    ...rideMutations
  },
});
