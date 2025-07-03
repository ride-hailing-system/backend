import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '../types/userType';
import {
  getAllDriversResolver,
  getAllRidersResolver,
  getAllUserResolver,
} from '../resolvers/userResolver';

export const userQueries = {
  getAllRiders: {
    type: new GraphQLList(UserType),
    resolve: getAllRidersResolver,
  },

  getAllDrivers: {
    type: new GraphQLList(UserType),
    resolve: getAllDriversResolver,
  },

  getAllUsers: {
    type: new GraphQLList(UserType),
     args: {
      role: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: getAllUserResolver,
  },
};
