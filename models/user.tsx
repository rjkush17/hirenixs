import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: {
    link: string;
    publicID: string;
  };
  username: string;
  role: "individual" | "organization" | null;
  onboardingVerified: boolean;
  providerID: string;
  providerName: string;
}

const userSchema = new Schema<IUser>(
  {
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
    avatar: {
      link: {
        type: String,
        trim: true,
      },
      publicID: {
        type: String,
        trim: true,
      },
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
    onboardingVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    providerName: {
      type: String,
      required: true,
    },
    providerID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User: Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
