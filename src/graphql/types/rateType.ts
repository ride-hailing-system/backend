import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import { UserType } from './userType';
import { RideType } from './rideType';

export const RateType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Represents a rating given by one user to another after a ride',
  fields: () => ({
    id: { type: GraphQLID, description: 'Unique ID of the rating' },
    ride: { type: RideType, description: 'The ride associated with the rating' },
    from: { type: UserType, description: 'User who gave the rating' },
    to: { type: UserType, description: 'User who received the rating' },
    rating: { type: GraphQLInt, description: 'Rating value between 1 and 5' },
    comment: { type: GraphQLString, description: 'Optional comment about the ride' },
  }),
});
