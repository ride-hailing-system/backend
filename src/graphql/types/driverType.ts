import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { UserType } from './userType';
import { VehicleType } from './vehicleType';
import { RideType } from './rideType';

export const GeoLocationType = new GraphQLObjectType({
  name: 'GeoLocation',
  description: 'Represents a geographical location in GeoJSON format',
  fields: () => ({
    type: {
      type: GraphQLID,
      description: 'GeoJSON type, typically "Point"',
    },
    coordinates: {
      type: new GraphQLList(GraphQLFloat),
      description: 'Coordinates in [longitude, latitude] format',
    },
  }),
});

export const GeoLocationInputType = new GraphQLInputObjectType({
  name: 'GeoLocationInput',
  fields: {
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
  },
});

export const DriverType = new GraphQLObjectType({
  name: 'Driver',
  description: 'Represents a driver in the system',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'Unique identifier for the driver',
    },
    user: {
      type: GraphQLString,
      description: 'Linked user account for the driver',
    },
    isAvailable: {
      type: GraphQLBoolean,
      description: 'Availability status for receiving rides',
    },
    location: {
      type: GeoLocationType,
      description: 'Driver current location',
    },
    vehicleInfo: {
      type: new GraphQLList(VehicleType),
      description: 'List of vehicles associated with the driver',
    },
    rides: {
      type: new GraphQLList(RideType),
      description: 'List of rides associated with the driver',
    },
    userInfo: {
      type: UserType,
      description: 'Detailed user information for the driver',
    },
  }),
});
