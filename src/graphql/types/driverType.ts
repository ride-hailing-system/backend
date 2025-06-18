import { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLList, GraphQLFloat, GraphQLInputObjectType } from 'graphql';
import { UserType } from './userType';

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
  name: "GeoLocationInput",
  fields: {
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
  },
});

export const DriverType = new GraphQLObjectType({
  name: 'Driver',
  description: 'Represents a driver in the system',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Unique identifier for the driver',
    },
    user: {
      type: UserType,
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
  }),
});
