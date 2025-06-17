import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  ride: mongoose.Types.ObjectId;
  rider: mongoose.Types.ObjectId;
  amount: number;
  method: 'cash' | 'card' | 'wallet';
  status: 'pending' | 'completed' | 'failed';
  paidAt?: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    ride: { type: Schema.Types.ObjectId, ref: 'Ride', required: true },
    rider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: Number,
    method: { type: String, enum: ['cash', 'card', 'wallet'], default: 'cash' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paidAt: String,
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>('Payment', paymentSchema);
