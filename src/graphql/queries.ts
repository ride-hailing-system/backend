import { GraphQLObjectType } from "graphql";
import { userQueries } from "./queries/userQueries";
import { authQueries } from "./queries/authQueries";
import { driverQueries } from "./queries/driverQueries";
import { vehicleQueries } from "./queries/vehicleQueries";
import { paymentQueries } from "./queries/paymentQueries";
import { rateQueries } from "./queries/rateQueries";

export const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...authQueries,
    ...driverQueries,
    ...vehicleQueries,
    ...paymentQueries,
    ...rateQueries
  },
});
