import mongoose from 'mongoose';
import rideModel, { IRide } from '../../models/rideModel';

export const createRideResolver = async (_: any, args: any) => {
  try {
    const { rider, pickupLocation, dropoffLocation, fare } = args;
    const ride = new rideModel({
      rider: rider,
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      fare: fare,
    });
    return await ride.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRideResolver = async (_: any, args: any) => {
  try {
    const { _id, driver, pickupLocation, dropoffLocation, fare, status } = args;

    const updateData: Partial<IRide> = {};
    if (driver) updateData.driver = driver;
    if (pickupLocation) updateData.pickupLocation = pickupLocation;
    if (dropoffLocation) updateData.dropoffLocation = dropoffLocation;
    if (dropoffLocation) updateData.dropoffLocation = dropoffLocation;
    if (status) updateData.status = status;
    if (fare) updateData.fare = fare;

    if (status === 'completed') {
      updateData.completedAt = new Date().toISOString();
    }
    const updatedRide = await rideModel.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedRide) throw new Error('Ride not found');
    return updatedRide;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteRideResolver = async (_: any, args: { _id: string }) => {
  try {
    const deleted = await rideModel.findByIdAndDelete(args._id);
    if (!deleted) throw new Error('Ride not found');
    return deleted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllRidesResolver = async () => {
  try {
    const result: any =  await rideModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'rider',
          foreignField: '_id',
          as: 'riderInfo',
        },
      },
      { $unwind: '$riderInfo' },
      {
        $lookup: {
          from: 'users',
          localField: 'driver',
          foreignField: '_id',
          as: 'driverInfo',
        },
      },
      { $unwind: { path: '$driverInfo', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          riderInfo: 1,
          driverInfo: 1,
          pickupLocation: 1,
          dropoffLocation: 1,
          fare: 1,
          status: 1,
          completedAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return result;  
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRideByIdResolver = async (_: any, args: { id: string }) => {
  try {
    const result = await rideModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(args.id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'rider',
          foreignField: '_id',
          as: 'rider',
        },
      },
      { $unwind: '$rider' },
      {
        $lookup: {
          from: 'users',
          localField: 'driver',
          foreignField: '_id',
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
    ]);

    if (!result[0]) throw new Error('Ride not found');
    return result[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
