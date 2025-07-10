import { GraphQLNonNull, GraphQLString } from 'graphql';
import { getDriverDetailResolver, getDriverInfoResolver } from '../resolvers/driverResolver';
import { DriverType } from '../types/driverType';
import { get } from 'http';

export const driverQueries = {
  getDriverInfo: {
    type: DriverType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: getDriverInfoResolver,
  },
  getDriverDetail: {
    type: DriverType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: getDriverDetailResolver,
  },
};

