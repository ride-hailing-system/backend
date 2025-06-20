import { GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { createRideResolver, deleteRideResolver, updateRideResolver } from "../resolvers/rideResolver";
import { RideType } from "../types/rideType";
import { GeoLocationInputType } from "../types/driverType";

export const rideMutations = {
    createRide: {
        type: RideType,
        args: {
            rider: { type: new GraphQLNonNull(GraphQLID) },
            pickupLocation: {type:new GraphQLNonNull(GeoLocationInputType)},
            dropoffLocation: {type:new GraphQLNonNull(GeoLocationInputType)},
            fare: { type: GraphQLFloat },
        },
        resolve: createRideResolver,
    },
    updateRide: {
        type: RideType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            driver: { type: GraphQLID },
            pickupLocation: {type:GeoLocationInputType},
            dropoffLocation: {type:GeoLocationInputType},
            fare: {type:GraphQLFloat},
            status: { type: GraphQLString },
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
}