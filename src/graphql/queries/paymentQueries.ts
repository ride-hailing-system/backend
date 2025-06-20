import { GraphQLList } from "graphql";
import { getAllPaymentsResolver, getPaymentByIdResolver } from "../resolvers/paymentResolver";
import { PaymentType } from "../types/paymentType";

export const paymentQueries = {
    getAllPayments: {
            type: new GraphQLList(PaymentType),
            resolve: getAllPaymentsResolver,
        },
        getPaymentById: {
            type: PaymentType,
            resolve: getPaymentByIdResolver,
        },   

      
}