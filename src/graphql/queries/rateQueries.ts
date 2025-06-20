import { GraphQLList } from "graphql";
import { RateType } from "../types/rateType";
import { getAllRatingsResolver, getRatingByIdResolver } from "../resolvers/rateResolver";

export const rateQueries = {
    getAllRates: {
            type: new GraphQLList(RateType),
            resolve: getAllRatingsResolver,
        },
        getRateById: {
            type: RateType,
            resolve: getRatingByIdResolver,
        },
}