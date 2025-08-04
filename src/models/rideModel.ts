import mongoose, { Document, Schema } from 'mongoose';

export interface IRide extends Document {
  rider?: mongoose.Types.ObjectId;
  driver?: mongoose.Types.ObjectId;
  requestNumber?: string;
  phoneNumber?: string,
  fullName?: string
  pickupLocation: {
    type: 'Point';
    coordinates: {
      latitude: number;
      longitude: number; 
      description: string;
    };
  };
  dropoffLocation: {
    type: 'Point';
    coordinates: {
      latitude: number;
      longitude: number; 
      description: string;
    };
  };
  fare: number;
  status: 'requested' | 'accepted' | 'rejected' | 'ongoing' | 'completed' | 'canceled';
  requestedAt: string;
  completedAt?: string;
  createdByAdmin?: boolean;
}

const rideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    driver: { type: Schema.Types.ObjectId, ref: 'User' },
    requestNumber: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    fullName: { type: String, required: false },
    pickupLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        description: { type: Number, required: true },
      },
    },
    dropoffLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        description: { type: Number, required: true },
      },
    },
    fare: Number,
    status: {
      type: String,
      enum: ['requested', 'accepted', 'rejected', 'ongoing', 'completed', 'canceled'],
      default: 'requested',
    },
    requestedAt: { type: String, default: Date.now.toString() },
    completedAt: String,
    createdByAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

rideSchema.index({ pickupLocation: '2dsphere', dropoffLocation: '2dsphere' });

export default mongoose.model<IRide>('Ride', rideSchema);
