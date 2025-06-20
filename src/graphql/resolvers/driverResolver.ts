import driverModel, { IDriver } from '../../models/driverModel';

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
