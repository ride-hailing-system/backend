import mongoose, { Schema, Document } from 'mongoose';

interface AfterNightHours {
  start: string;
  end: string;
}

export interface ISetting extends Document {
  general: {
    appName: string;
    supportEmail: string;
    supportPhone: string;
    currency: string;
    afterNightHours?: AfterNightHours;
  };
  location: {
    pickupRadius: number;
    locationUpdateInterval: number;
  };
  ride: {
    baseFare: number;
    ratePerKm: number;
    ratePerKmAfterNight: number;
    cancelationTimeLimit: number;
    maxRideDistance: number;
    rideRequestTimeout: number;
  };
  payment: {
    paymentMethods: string[];
    taxRate: number;
    driverCommission: number;
  };
  user: {
    requireKyc: boolean;
    requireDriverApproval: boolean;
  };
  notification: {
    enableSms: boolean;
    enablePush: boolean;
    enableEmail: boolean;
  };
  templates: {
    driverAssigned: string;
    rideCanceled: string;
  };
}

const SettingSchema = new Schema<ISetting>(
  {
    general: {
      appName: { type: String, required: true },
      supportEmail: { type: String, required: true },
      supportPhone: { type: String, required: true },
      currency: { type: String, required: true },
      afterNightHours: {
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
    },
    location: {
      pickupRadius: { type: Number, required: true },
      locationUpdateInterval: { type: Number, required: true },
    },
    ride: {
      baseFare: { type: Number, required: true },
      ratePerKm: { type: Number, required: true },
      ratePerKmAfterNight: { type: Number, required: true },
      cancelationTimeLimit: { type: Number, required: true },
      maxRideDistance: { type: Number, required: true },
      rideRequestTimeout: { type: Number, required: true },
    },
    payment: {
      paymentMethods: [{ type: String, required: true }],
      taxRate: { type: Number, required: true },
      driverCommission: { type: Number, required: true },
    },
    user: {
      requireKyc: { type: Boolean, required: true },
      requireDriverApproval: { type: Boolean, required: true },
    },
    notification: {
      enableSms: { type: Boolean, required: true },
      enablePush: { type: Boolean, required: true },
      enableEmail: { type: Boolean, required: true },
    },
    templates: {
      driverAssigned: { type: String, required: true },
      rideCanceled: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Setting ||
  mongoose.model<ISetting>('Setting', SettingSchema);
