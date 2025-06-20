import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '../types/userType';
import {
  createUserResolver,
  deleteUserResolver,
  updateUserResolver,
} from '../resolvers/userResolver';

export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
      role: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: createUserResolver,
  },
  updateUser: {
    type: UserType,
    args: {
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      phoneNumber: { type: GraphQLString },
      role: { type: GraphQLString },
      photoUrl: { type: GraphQLString },
    },
    resolve: updateUserResolver,
  },

  deleteUser: {
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: deleteUserResolver,
  },
};
