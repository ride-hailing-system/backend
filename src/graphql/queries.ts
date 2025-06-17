import { GraphQLObjectType } from "graphql";
import { userQueries } from "./queries/userQueries";

export const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
  },
});
