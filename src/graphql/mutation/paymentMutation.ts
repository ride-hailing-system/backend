import { GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { PaymentType } from '../types/paymentType';
import {
  createPaymentResolver,
  updatePaymentResolver,
  deletePaymentResolver,
} from '../resolvers/paymentResolver';

export const paymentMutations = {
  createPayment: {
    type: PaymentType,
    description: 'Create a new payment',
    args: {
      ride: { type: new GraphQLNonNull(GraphQLID) },
      rider: { type: new GraphQLNonNull(GraphQLID) },
      amount: { type: new GraphQLNonNull(GraphQLFloat) },
      method: { type: GraphQLString },
      status: { type: GraphQLString },
      paidAt: { type: GraphQLString },
    },
    resolve: createPaymentResolver,
  },
  updatePayment: {
    type: PaymentType,
    description: 'Update a payment by ID',
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      ride: { type: new GraphQLNonNull(GraphQLID) },
      rider: { type: new GraphQLNonNull(GraphQLID) },
      amount: { type: new GraphQLNonNull(GraphQLFloat) },
      method: { type: GraphQLString },
      status: { type: GraphQLString },
      paidAt: { type: GraphQLString },
    },
    resolve: updatePaymentResolver,
  },
  deletePayment: {
    type: PaymentType,
    description: 'Delete a payment by ID',
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: deletePaymentResolver,
  },
};
