import { GraphQLNonNull, GraphQLString } from 'graphql';
import { getSessionByIdResolver, loginResolver, logoutResolver } from '../resolvers/authResolver';
import { LoginType } from '../types/userType';
import { SessionType } from '../types/sessionType';

export const authQueries = {
  login: {
    type: LoginType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: loginResolver,
  },

  // session
  getSessionById: {
    type: SessionType,
    resolve: getSessionByIdResolver,
  },

  logout: {
    type: SessionType,
    resolve: logoutResolver,
  },
};
