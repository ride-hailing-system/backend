import { GraphQLList } from 'graphql';
import { getAllRidersResolver } from '../resolvers/userResolver';
import { RideType } from '../types/rideType';
import { getRideByIdResolver } from '../resolvers/rideResolver';

export const rideQueries = {
  getAllRides: {
    type: new GraphQLList(RideType),
    resolve: getAllRidersResolver,
  },
  getRideById: {
    type: RideType,
    resolve: getRideByIdResolver,
  },
};
