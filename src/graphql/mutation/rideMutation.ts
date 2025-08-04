import { GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import {
  createRideResolver,
  deleteRideResolver,
  updateRideResolver,
} from '../resolvers/rideResolver';
import { RideType } from '../types/rideType';
import { GeoLocationInputType } from '../types/driverType';

export const rideMutations = {
  createRide: {
    type: RideType,
    args: {
      rider: { type: GraphQLID },
      requestNumber: { type: new GraphQLNonNull(GraphQLString) },
      phoneNumber: { type: GraphQLString },
      fullName: { type: GraphQLString },
      pickupLocation: { type: new GraphQLNonNull(GeoLocationInputType) },
      dropoffLocation: { type: new GraphQLNonNull(GeoLocationInputType) },
      fare: { type: GraphQLFloat },
      createdByAdmin: { type: GraphQLBoolean },
    },
    resolve: createRideResolver,
  },
  updateRide: {
    type: RideType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      phoneNumber: { type: GraphQLString },
      fullName: { type: GraphQLString },
      driver: { type: GraphQLID },
      pickupLocation: { type: GeoLocationInputType },
      dropoffLocation: { type: GeoLocationInputType },
      fare: { type: GraphQLFloat },
      status: { type: GraphQLString },
      createdByAdmin: { type: GraphQLBoolean },
    },
    resolve: updateRideResolver,
  },
  deleteRide: {
    type: RideType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: deleteRideResolver,
  },
};
