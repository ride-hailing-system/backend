import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLString,
  } from 'graphql';
  import { UserType } from './userType'; 
  
  export const PaymentType = new GraphQLObjectType({
    name: 'Payment',
    description: 'Represents a payment made for a ride',
    fields: () => ({
      id: { type: GraphQLID, description: 'Unique identifier for the payment' },
      ride: { type: GraphQLID, description: 'Ride ID associated with the payment' },
      rider: { type: UserType, description: 'User who made the payment' },
      amount: { type: GraphQLFloat, description: 'Total amount paid' },
      method: { type: GraphQLString, description: 'Payment method used' },
      status: { type: GraphQLString, description: 'Payment status' },
      paidAt: { type: GraphQLString, description: 'Payment timestamp (ISO format)' },
    }),
  });
  