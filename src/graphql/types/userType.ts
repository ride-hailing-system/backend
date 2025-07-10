import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

const fields: any = {
  _id: {
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
  phoneNumber: {
    type: GraphQLString,
    description: 'Phone number of the user',
  },
  role: {
    type: GraphQLString,
    description: 'Role of the user (rider)',
  },
  status: {
    type: GraphQLString,
    description: 'Current status of the user',
  },
  photoUrl: {
    type: GraphQLString,
    description: 'URL of the user\'s profile photo',
  },
  suspendReason: {
    type: GraphQLString,
    description: "Primary reason for suspending the user account (e.g., abuse, fraud, inactivity)."
  },
  additionalInfo: {
    type: GraphQLString,
    description: "Optional details or notes related to the suspension action."
  },  
  createdAt: {
    type: GraphQLString,
    description: 'Timestamp of when the user was created',
  },
  updatedAt: {
    type: GraphQLString,
    description: 'Timestamp of the last update to the user',
  },
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Represents a user in the ride-hailing system (rider only)',
  fields: fields,
});

export const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    ...fields,
    token: {
      type: GraphQLString,
      description: 'The login token.',
    },
  }),
});
