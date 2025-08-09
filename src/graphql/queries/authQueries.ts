import { GraphQLNonNull, GraphQLString } from 'graphql';
import { checkPasswordResolver, getSessionByIdResolver, loginResolver, logoutResolver } from '../resolvers/authResolver';
import { LoginType, UserType } from '../types/userType';
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

  // check password
  checkPassword: {
    type: UserType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: checkPasswordResolver,
  },
};
