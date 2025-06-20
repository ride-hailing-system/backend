import mongoose, { Document, Schema } from 'mongoose';

export interface IRide extends Document {
  rider: mongoose.Types.ObjectId;
  driver?: mongoose.Types.ObjectId;
  pickupLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  dropoffLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  fare: number;
  status: 'requested' | 'accepted' | 'rejected' | 'ongoing' | 'completed' | 'canceled';
  requestedAt: string;
  completedAt?: string;
}

const rideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'User' },
    pickupLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number],
    },
    dropoffLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number],
    },
    fare: Number,
    status: {
      type: String,
      enum: ['requested', 'accepted', "rejected",'ongoing', 'completed', 'canceled'],
      default: 'requested',
    },
    requestedAt: { type: String, default: Date.now.toString() },
    completedAt: String,
  },
  { timestamps: true }
);

rideSchema.index({ pickupLocation: '2dsphere', dropoffLocation: '2dsphere' });

export default mongoose.model<IRide>('Ride', rideSchema);
