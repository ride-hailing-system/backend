import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { RateType } from "../types/rateType";
import { createRatingResolver, deleteRatingResolver, updateRatingResolver } from "../resolvers/rateResolver";

export const rateMutations = {
    createRating: {
        type: RateType,
        description: 'Create a new rating',
        args: {
            ride: { type: new GraphQLNonNull(GraphQLID) },
            from: { type: new GraphQLNonNull(GraphQLID) },
            to: { type: new GraphQLNonNull(GraphQLID) },
            rating: { type: new GraphQLNonNull(GraphQLInt) },
            comment: { type: GraphQLString },
        },
        resolve: createRatingResolver,
      },

      updateRating: {
        type: RateType,
        description: 'Update a rating by ID',
        args: {
          _id: { type: new GraphQLNonNull(GraphQLID) },
          ride: { type: new GraphQLNonNull(GraphQLID) },
          from: { type: new GraphQLNonNull(GraphQLID) },
          to: { type: new GraphQLNonNull(GraphQLID) },
          rating: { type: new GraphQLNonNull(GraphQLInt) },
          comment: { type: GraphQLString },
        },
        resolve: updateRatingResolver,
      },
      deleteRating: {
        type: RateType,
        description: 'Delete a rating by ID',
        args: {
          _id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: deleteRatingResolver,
      }
}