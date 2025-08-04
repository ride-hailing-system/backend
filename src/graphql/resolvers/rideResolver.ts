import mongoose from 'mongoose';
import rideModel, { IRide } from '../../models/rideModel';

export const createRideResolver = async (_: any, args: any) => {
  try {
    const { rider, pickupLocation, dropoffLocation, fare, phoneNumber, fullName,createdByAdmin,requestNumber } = args;
    const ride = new rideModel({
      rider: rider,
      pickupLocation: { type: "Point",coordinates: { ...pickupLocation } },
      dropoffLocation: { type: "Point",coordinates: { ...dropoffLocation} },
      fare: fare,
      phoneNumber: phoneNumber,
      fullName: fullName,
      createdByAdmin:createdByAdmin,
      requestNumber: requestNumber
    });
    return await ride.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRideResolver = async (_: any, args: any) => {
  try {
    const { _id, driver, pickupLocation, dropoffLocation, fare, status,phoneNumber,fullName,createdByAdmin } = args;

    const updateData: Partial<IRide> = {};
    if (driver) updateData.driver = driver;
    if (pickupLocation) updateData.pickupLocation = { type: "Point", coordinates: { ...pickupLocation } };
    if (dropoffLocation) updateData.dropoffLocation = { type: "Point", coordinates: { ...dropoffLocation } };
    if (status) updateData.status = status;
    if (fare) updateData.fare = fare;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (fullName) updateData.fullName = fullName;
    if (createdByAdmin) updateData.createdByAdmin = createdByAdmin

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

export const getAllRidesResolver = async (_: any, args: { limit: number }) => {
  try {
    const {limit} = args;

    const result: any =  await rideModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'rider',
          foreignField: '_id',
          as: 'riderInfo',
        },
      },
      { $unwind: { path: '$riderInfo', preserveNullAndEmptyArrays: true }, },
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
          phoneNumber: 1,
          fullName: 1,
          requestedAt: 1,
          completedAt: 1,
          createdByAdmin: 1,
          requestNumber: 1
        },
      },
      { $sort: { requestedAt: -1 } },
      { $limit: limit }
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
      { $unwind: { path: '$riderInfo', preserveNullAndEmptyArrays: true }, },
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
