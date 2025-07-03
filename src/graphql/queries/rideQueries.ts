import { GraphQLList } from 'graphql';
import { RideType } from '../types/rideType';
import { getAllRidesResolver, getRideByIdResolver } from '../resolvers/rideResolver';

export const rideQueries = {
  getAllRides: {
    type: new GraphQLList(RideType),
    resolve: getAllRidesResolver,
  },
  getRideById: {
    type: RideType,
    resolve: getRideByIdResolver,
  },
};
