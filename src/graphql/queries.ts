import { GraphQLObjectType } from "graphql";
import { userQueries } from "./queries/userQueries";
import { authQueries } from "./queries/authQueries";

export const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...authQueries
  },
});
