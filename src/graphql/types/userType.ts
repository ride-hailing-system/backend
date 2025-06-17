import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Represents a user in the ride-hailing system (rider only)',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Unique identifier for the user',
    },
    firstName: {
      type: GraphQLString,
      description: 'First name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'Last name of the user',
    },
    email: {
      type: GraphQLString,
      description: 'Email address used for login and communication',
    },
    phone: {
      type: GraphQLString,
      description: 'Phone number of the user',
    },
    role: {
      type: GraphQLString,
      description: 'Role of the user (rider)',
    },
  }),
});
