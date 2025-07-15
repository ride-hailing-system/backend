import vehicleModel from '../../models/vehicleModel';

export const getAllVehiclesResolver = async () => {
  try {
    const result: any = await vehicleModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'driver',
          foreignField: '_id',
          as: 'driverInfo',
        },
      },
      { $unwind: '$driverInfo' },
      { $sort: { createdAt: -1 } },
    ]);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getVehicleByIdResolver = async (_: any, args: any) => {
  try {
    const { _id } = args;

    const vehicle = await vehicleModel.findById(_id);
    if (!vehicle) throw new Error('Vehicle not found');
    return vehicle;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createVehicleResolver = async (_: any, args: any) => {
  try {
    const { driver, vehicleType, plateNumber, vehicleModel: model, size, color, isDriverOwner,vin, ownerInfo } = args;

    const vehicle = new vehicleModel({
      driver: driver,
      vehicleType: vehicleType,
      plateNumber: plateNumber,
      vehicleModel: model,
      size: size,
      color: color,
      isDriverOwner:isDriverOwner,
      vin:vin,
      ownerInfo:ownerInfo
    });

    const savedVehicle = await vehicle.save();
    return savedVehicle;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateVehicleResolver = async (_: any, args: any) => {
  try {
    const { _id, driver, vehicleType, plateNumber, vehicleModel: model, size, color,isDriverOwner,vin,ownerInfo } = args;

    const updatedVehicle = await vehicleModel.findByIdAndUpdate(
      _id,
      {
        driver: driver,
        vehicleType: vehicleType,
        plateNumber: plateNumber,
        vehicleModel: model,
        size: size,
        color: color,
        isDriverOwner:isDriverOwner,
        vin:vin,
        ownerInfo:ownerInfo
      },
      { new: true }
    );

    if (!updatedVehicle) throw new Error('Vehicle not found');
    return updatedVehicle;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteVehicleResolver = async (_: any, args: any) => {
  try {
    const { _id } = args;

    const deleted = await vehicleModel.findByIdAndDelete(_id);
    if (!deleted) throw new Error('Vehicle not found');
    return deleted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
