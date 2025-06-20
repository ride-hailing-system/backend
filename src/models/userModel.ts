import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  status?: 'active' | 'inactive' | 'suspended' | 'deleted';
  role: 'rider' | 'driver' | 'user' | 'admin';
  photoUrl: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    role: { type: String, enum: ['rider', 'driver', 'user', 'admin'], default: 'rider' },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended', 'deleted'],
      default: 'active',
    },
    photoUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
