import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUserOTP extends Document {
  name: string;
  email: string;
  password?: string;
  username: string;
  role: "individual" | "organization" | null;
  otp: string;
  generatedTime: number;
}

const userOTPSchema = new Schema<IUserOTP>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: false,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["individual", "organization", null],
    default: null,
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

export const UserOTP: Model<IUserOTP> =
  mongoose.models?.UserOTP ||
  mongoose.model<IUserOTP>("UserOTP", userOTPSchema);
