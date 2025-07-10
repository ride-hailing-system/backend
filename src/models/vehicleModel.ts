import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  driver: mongoose.Types.ObjectId;
  vehicleType: string;
  plateNumber: string;
  vehicleModel: string;
  size: string;
  color: string;
  vin: string;
  vehicleImage?: string;
  ownerInfo?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}

const vehicleSchema = new Schema<IVehicle>(
  {
    driver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleType: String,
    plateNumber: String,
    vehicleModel: String,
    size: String,
    color: String,
    vin: String,
    vehicleImage: { type: String, default: '' },
    ownerInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    }
  },
  { timestamps: true }
);

export default mongoose.model<IVehicle>('Vehicle', vehicleSchema);
