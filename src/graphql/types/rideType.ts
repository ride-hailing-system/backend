import { GraphQLObjectType, GraphQLID, GraphQLFloat, GraphQLString } from 'graphql';
import { UserType } from './userType';
import { GeoLocationType } from './driverType';

export const RideType = new GraphQLObjectType({
  name: 'Ride',
  description: 'Represents a ride request and its journey details',
  fields: () => ({
    _id: { type: GraphQLID, description: 'Unique identifier for the ride' },
    riderInfo: { type: UserType, description: 'User who requested the ride' },
    driverInfo: { type: UserType, description: 'Driver who accepted the ride (optional)' },
    pickupLocation: {
      type: GeoLocationType,
      description: 'Pickup location coordinates',
    },
    dropoffLocation: {
      type: GeoLocationType,
      description: 'Dropoff location coordinates',
    },
    fare: { type: GraphQLFloat, description: 'Estimated or final fare of the ride' },
    status: {
      type: GraphQLString,
      description: 'Ride status: requested, accepted, ongoing, completed, etc.',
    },
    requestedAt: {
      type: GraphQLString,
      description: 'ISO timestamp when the ride was requested',
    },
    completedAt: {
      type: GraphQLString,
      description: 'ISO timestamp when the ride was completed (optional)',
    },
  }),
});
