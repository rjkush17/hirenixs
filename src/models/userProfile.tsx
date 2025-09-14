import mongoose, { Document, Schema } from "mongoose";

export interface IUserProfile extends Document {
  userID: mongoose.Schema.Types.ObjectId;
  title: string;
  bio?: string;
  skills: string[];
  experience: {
    company: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }[];
  education: {
    institute: string;
    course: string;
    startDate: Date;
    endDate: Date;
    description?: string;
  }[];
  social: {
    platform: string;
    url: string;
  }[];
  connection: {
    userID: mongoose.Schema.Types.ObjectId;
    status: "connected" | "received" | "sent";
  }[];
  savedJobs: {
    jobID: mongoose.Schema.Types.ObjectId;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 30,
    },
    bio: {
      type: String,
      trim: true,
      minlength: 20,
      maxlength: 250,
    },
    skills: [
      {
        type: String,
        trim: true,
        minlength: 2,
      },
    ],
    experience: [
      {
        company: { type: String, trim: true, required: true },
        title: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
    education: [
      {
        institute: { type: String, trim: true, required: true },
        course: { type: String, trim: true, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        description: { type: String, trim: true },
      },
    ],
    social: [
      {
        platform: { type: String, trim: true },
        url: { type: String, trim: true },
      },
    ],
    connection: [
      {
        userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: {
          type: String,
          enum: ["connected", "received", "sent"],
          required: true,
        },
      },
    ],
    savedJobs: [
      {
        jobID: { type: Schema.Types.ObjectId, ref: "Job" },
      },
    ],
  },
  { timestamps: true }
);

export const UserProfile = mongoose.model<IUserProfile>("UserProfile", userProfileSchema);

