import { GraphQLNonNull, GraphQLString } from 'graphql';
import { loginResolver } from '../resolvers/authResolver';
import { LoginType } from '../types/userType';

export const authQueries = {
  login: {
    type: LoginType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: loginResolver,
  },
};
