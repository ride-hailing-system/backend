import { GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import { RideType } from '../types/rideType';
import { getAllRidesResolver, getRideByIdResolver } from '../resolvers/rideResolver';

export const rideQueries = {
  getAllRides: {
    type: new GraphQLList(RideType),
    args: {
      limit: { type: new GraphQLNonNull(GraphQLInt)  },
    },
    resolve: getAllRidesResolver,
  },
  getRideById: {
    type: RideType,
    resolve: getRideByIdResolver,
  },
};
