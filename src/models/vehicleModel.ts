import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  driver: mongoose.Types.ObjectId;
  type: string;
  plateNumber: string;
  vehicleModel: string;
  size: string;
  color: string;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    driver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: String,
    plateNumber: String,
    vehicleModel: String,
    size: String,
    color: String,
  },
  { timestamps: true }
);

export default mongoose.model<IVehicle>('Vehicle', vehicleSchema);
