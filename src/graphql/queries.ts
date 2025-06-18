import { GraphQLObjectType } from "graphql";
import { userQueries } from "./queries/userQueries";
import { authQueries } from "./queries/authQueries";
import { driverQueries } from "./queries/driverQueries";
import { vehicleQueries } from "./queries/vehicleQueries";

export const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...authQueries,
    ...driverQueries,
    ...vehicleQueries
  },
});
