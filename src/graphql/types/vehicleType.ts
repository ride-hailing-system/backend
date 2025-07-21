import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';
import { UserType } from './userType';

export const VehicleType = new GraphQLObjectType({
  name: 'Vehicle',
  description: 'Represents a vehicle used by a driver',
  fields: () => ({
    _id: {
      type: GraphQLString,
      description: 'Unique identifier of the vehicle',
    },
    driver: {
      type: GraphQLString,
      description: 'Unique identifier of the driver',
    },
    driverInfo: {
      type: UserType,
      description: 'Information about the driver of the vehicle',
    },
    ownerInfo: {
      type: UserType,
      description: 'Information about the owner of the vehicle',
    },
    vehicleType: {
      type: GraphQLString,
      description: 'Type of the vehicle (e.g., sedan, SUV)',
    },
    plateNumber: {
      type: GraphQLString,
      description: 'Vehicle plate number',
    },
    vehicleModel: {
      type: GraphQLString,
      description: 'Model of the vehicle',
    },
    vin: {
      type: GraphQLString,
      description: 'Vehicle Identification Number (VIN)',
    },
    size: {
      type: GraphQLString,
      description: 'Size category of the vehicle (e.g., compact, full-size)',
    },
    color: {
      type: GraphQLString,
      description: 'Color of the vehicle',
    },
    vehicleImage: {
      type: GraphQLString,
      description: 'URL of the vehicle image',
    },
    isDriverOwner: {
      type: GraphQLBoolean,
      description: 'Indicate the owner ship of vehicle bu driver',
    },
    createdAt: {
      type: GraphQLString,
      description: 'Timestamp of when the vehicle was created',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'Timestamp of the last update to the vehicle',
    },
  }),
});
