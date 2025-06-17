import { GraphQLSchema } from "graphql";
import { Query } from "./queries";
import { Mutation } from "./mutation";

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
