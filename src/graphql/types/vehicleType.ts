import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
  } from 'graphql';
  import { UserType } from './userType';
  
  export const VehicleType = new GraphQLObjectType({
    name: 'Vehicle',
    description: 'Represents a vehicle used by a driver',
    fields: () => ({
      id: {
        type: GraphQLID,
        description: 'Unique identifier of the vehicle',
      },
      driver: {
        type: UserType,
        description: 'Reference to the driver (User Model)',
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
      size: {
        type: GraphQLString,
        description: 'Size category of the vehicle (e.g., compact, full-size)',
      },
      color: {
        type: GraphQLString,
        description: 'Color of the vehicle',
      },
    }),
  });
  