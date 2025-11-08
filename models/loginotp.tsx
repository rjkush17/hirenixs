import mongoose, { Document, Schema, Model } from "mongoose";

export interface ILoginOTP extends Document {
  email: string;
  otp: string;
  generatedTime: number;
  createdAt: Date;
}

const loginOTPSchema = new Schema<ILoginOTP>({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  otp: {
    type: String,
    min: 6,
    max: 6,
  },
  generatedTime: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800,
  },
});

export const LoginOTP: Model<ILoginOTP> =
  mongoose.models?.LoginOTP ||
  mongoose.model<ILoginOTP>("LoginOTP", loginOTPSchema);
