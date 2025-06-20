import mongoose from 'mongoose';
import rateModel from '../../models/rateModel';

export const createRatingResolver = async (_: any, args: any) => {
  try {
    const { ride, from, to, rating: ratingValue, comment } = args;

    const rating = new rateModel({
      ride: ride,
      from: from,
      to: to,
      rating: ratingValue,
      comment: comment,
    });

    return await rating.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRatingResolver = async (_: any, args: any) => {
  try {
    const { _id, ride, from, to, rating: ratingValue, comment } = args;

    const updated = await rateModel.findByIdAndUpdate(
      _id,
      {
        ride: ride,
        from: from,
        to: to,
        rating: ratingValue,
        comment: comment,
      },
      { new: true }
    );

    if (!updated) throw new Error('Rating not found');
    return updated;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteRatingResolver = async (_: any, args: any) => {
  try {
    const { _id } = args;
    const deleted = await rateModel.findByIdAndDelete(_id);
    if (!deleted) throw new Error('Rating not found');
    return deleted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllRatingsResolver = async () => {
  try {
    return await rateModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'from',
          foreignField: '_id',
          as: 'from',
        },
      },
      { $unwind: '$from' },
      {
        $lookup: {
          from: 'users',
          localField: 'to',
          foreignField: '_id',
          as: 'to',
        },
      },
      { $unwind: '$to' },
      {
        $lookup: {
          from: 'rides',
          localField: 'ride',
          foreignField: '_id',
          as: 'ride',
        },
      },
      { $unwind: '$ride' },
    ]);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRatingByIdResolver = async (_: any, args: { id: string }) => {
  try {
    const result = await rateModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(args.id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'from',
          foreignField: '_id',
          as: 'from',
        },
      },
      { $unwind: '$from' },
      {
        $lookup: {
          from: 'users',
          localField: 'to',
          foreignField: '_id',
          as: 'to',
        },
      },
      { $unwind: '$to' },
      {
        $lookup: {
          from: 'rides',
          localField: 'ride',
          foreignField: '_id',
          as: 'ride',
        },
      },
      { $unwind: '$ride' },
    ]);

    if (!result[0]) throw new Error('Rating not found');
    return result[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
