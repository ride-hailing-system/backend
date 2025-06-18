import { GraphQLNonNull, GraphQLString } from "graphql";
import { getDriverInfoResolver } from "../resolvers/driverResolver";
import { DriverType } from "../types/driverType";

export const driverQueries = {
    getDriverInfo: {
    type: DriverType,
    args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
    resolve: getDriverInfoResolver,
    },
    
   
};