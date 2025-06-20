import mongoose from 'mongoose';
import paymentModel from '../../models/paymentModel';

export const getAllPaymentsResolver = async () => {
  try {
    return await paymentModel.aggregate([
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

export const getPaymentByIdResolver = async (_: any, args: { id: string }) => {
  try {
    const result = await paymentModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(args.id),
        },
      },
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
          from: 'rides',
          localField: 'ride',
          foreignField: '_id',
          as: 'ride',
        },
      },
      { $unwind: '$ride' },
    ]);

    if (!result[0]) throw new Error('Payment not found');
    return result[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createPaymentResolver = async (_: any, args: any) => {
  try {
    const { ride, rider, amount, paidAt } = args;

    const payment = new paymentModel({
      ride: ride,
      rider: rider,
      amount: amount,
      paidAt: paidAt,
    });

    const savedPayment = await payment.save();
    return savedPayment;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updatePaymentResolver = async (_: any, args: any) => {
  try {
    const { _id, amount, method, status, paidAt } = args;
    const updated = await paymentModel.findByIdAndUpdate(
      _id,
      {
        amount: amount,
        method: method,
        status: status,
      },
      { new: true }
    );

    if (!updated) throw new Error('Payment not found');
    return updated;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deletePaymentResolver = async (_: any, args: any) => {
  try {
    const { _id } = args;
    const deleted = await paymentModel.findByIdAndDelete(_id);
    if (!deleted) throw new Error('Payment not found');
    return deleted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
