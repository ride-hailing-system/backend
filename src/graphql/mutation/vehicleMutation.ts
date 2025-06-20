import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { VehicleType } from '../types/vehicleType';
import {
  createVehicleResolver,
  deleteVehicleResolver,
  updateVehicleResolver,
} from '../resolvers/vehicleResolver';

export const vehicleMutations = {
  createVehicle: {
    type: VehicleType,
    description: 'Create a new vehicle',
    args: {
      driver: { type: new GraphQLNonNull(GraphQLID), description: 'Driver ID' },
      vehicleType: { type: GraphQLString },
      plateNumber: { type: GraphQLString },
      vehicleModel: { type: GraphQLString },
      size: { type: GraphQLString },
      color: { type: GraphQLString },
    },
    resolve: createVehicleResolver,
  },

  updateVehicle: {
    type: VehicleType,
    description: 'Update an existing vehicle',
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID), description: 'Vehicle ID' },
      vehicleType: { type: GraphQLString },
      plateNumber: { type: GraphQLString },
      vehicleModel: { type: GraphQLString },
      size: { type: GraphQLString },
      color: { type: GraphQLString },
    },
    resolve: updateVehicleResolver,
  },
  deleteVehicle: {
    type: VehicleType,
    description: 'Delete a vehicle by ID',
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID), description: 'Vehicle ID' },
    },
    resolve: deleteVehicleResolver,
  },
};
