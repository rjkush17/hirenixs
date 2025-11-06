import mongoose, { Document, Schema, Model } from "mongoose";

export interface ILoginOTP extends Document {
  email: string;
  otp: string;
  generatedTime: number;
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
    expires: 300,
  },
});

export const LoginOTP: Model<ILoginOTP> =
  mongoose.models?.LoginOTP ||
  mongoose.model<ILoginOTP>("LoginOTP", loginOTPSchema);
