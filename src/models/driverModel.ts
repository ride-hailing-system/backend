import mongoose, { Document, Schema } from 'mongoose';

export interface IDriver extends Document {
  user: mongoose.Types.ObjectId;
  isAvailable: boolean;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const driverSchema = new Schema<IDriver>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isAvailable: { type: Boolean, default: false },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  { timestamps: true }
);

driverSchema.index({ location: '2dsphere' });

export default mongoose.model<IDriver>('Driver', driverSchema);
