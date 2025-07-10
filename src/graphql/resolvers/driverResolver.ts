import driverModel, { IDriver } from '../../models/driverModel';
import mongoose from 'mongoose';

export const getDriverInfoResolver = async (_: any, args: any) => {
  try {
    const { userId } = args;

    const results = await driverModel.find({ userId: userId }).lean();
    return results;
  } catch (error) {
    console.error('Error get driver info:', error);
    throw new Error('Failed to get driver info');
  }
};

export const getDriverDetailResolver = async (_: any, args: any) => {
  try {
    const { userId } = args;

    const results = await driverModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "user",
          foreignField: "driver",
          as: "vehicleInfo",
        },
      },
      {
        $lookup: {
          from: "rides",
          localField: "user",
          foreignField: "driver",
          as: "ridesInfo",
        },
      },
      {
        $unwind: {
          path: "$ridesInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "ridesInfo.rider",
          foreignField: "_id",
          as: "ridesInfo.riderInfo",
        },
      },
      {
        $unwind: {
          path: "$ridesInfo.riderInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          isAvailable: { $first: "$isAvailable" },
          location: { $first: "$location" },
          userInfo: { $first: "$userInfo" },
          vehicleInfo: { $first: "$vehicleInfo" },
          rides: {
            $push: "$ridesInfo",
          },
        },
      },
      {
        $project: {
          _id: 1,
          isAvailable: 1,
          location: 1,
          userInfo: 1,
          vehicleInfo: 1,
          rides: 1,
        },
      },
    ]);
  
    return results[0] || null;
  } catch (error) {
    console.error("Error getting driver detail:", error);
    throw new Error("Failed to get driver detail");
  }
  
};

export const updateDriverInfoResolver = async (_: any, args: any) => {
  try {
    const { _id, isAvailable, location } = args;

    const updateData: Partial<IDriver> = {};
    if (isAvailable) updateData.isAvailable = isAvailable;
    if (location)
      updateData.location = {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      };

    const updatedResult = await driverModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedResult) {
      throw new Error('Failed to update driver info. Please try again later.');
    }

    return updatedResult;
  } catch (error) {
    console.error('Error updating driver info:', error);
    throw new Error('Failed to update driver info');
  }
};
