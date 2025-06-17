import mongoose, { Document, Schema } from 'mongoose';

export interface IRating extends Document {
  ride: mongoose.Types.ObjectId;
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const ratingSchema = new Schema<IRating>(
  {
    ride: { type: Schema.Types.ObjectId, ref: 'Ride', required: true },
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

export default mongoose.model<IRating>('Rating', ratingSchema);
