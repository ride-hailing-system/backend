import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { UserType } from './userType'; 

export const SessionType = new GraphQLObjectType({
  name: 'Session',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    sessionId: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) },
    token: { type: new GraphQLNonNull(GraphQLString),description: 'The login token.' },
    createdAt: { type: GraphQLString },
    expiresAt: { type: GraphQLString },
    ipAddress: { type: GraphQLString },
    userAgent: { type: GraphQLString },
  }),
});
