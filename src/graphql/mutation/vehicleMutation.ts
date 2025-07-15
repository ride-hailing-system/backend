import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { VehicleType } from '../types/vehicleType';
import {
  createVehicleResolver,
  deleteVehicleResolver,
  updateVehicleResolver,
} from '../resolvers/vehicleResolver';

const OwnerInfoInputType = new GraphQLInputObjectType({
  name: 'OwnerInfoInput',
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const vehicleMutations = {
  createVehicle: {
    type: VehicleType,
    description: 'Create a new vehicle',
    args: {
      driver: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'Driver ID',
      },
      vehicleType: { type: GraphQLString },
      plateNumber: { type: GraphQLString },
      vehicleModel: { type: GraphQLString },
      size: { type: GraphQLString },
      color: { type: GraphQLString },
      vin: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Vehicle Identification Number',
      },
      isDriverOwner: { type: GraphQLBoolean },
      ownerInfo: { type: OwnerInfoInputType },
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
      vin: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Vehicle Identification Number',
      },
      isDriverOwner: { type: GraphQLBoolean },
      ownerInfo: { type: OwnerInfoInputType },
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
