import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { updateDriverInfoResolver } from '../resolvers/driverResolver';
import { DriverType, GeoLocationInputType } from '../types/driverType';

export const driverMutations = {
  updateDriver: {
    type: DriverType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
      isAvailable: { type: GraphQLBoolean },
      location: { type: GeoLocationInputType },
    },
    resolve: updateDriverInfoResolver,
  },
};
