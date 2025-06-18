import { GraphQLList } from "graphql";
import { getAllVehiclesResolver, getVehicleByIdResolver } from "../resolvers/vehicleResolver";
import { VehicleType } from "../types/vehicleType";

export const vehicleQueries = {
      getAllVehicles: {
            type: new GraphQLList(VehicleType),
            resolve: getAllVehiclesResolver,
        },
        getVehicleById: {
            type: VehicleType,
            resolve: getVehicleByIdResolver,
        },
}