import mongoose, { Schema, Types, Document } from "mongoose";

export interface ICompanyProfile extends Document {
  userID: Types.ObjectId;
  industry_type: string;
  peoples: Types.ObjectId[];
  location: string;
  website?: string;
  follows: number;
  createdAt: Date;
  updatedAt: Date;
}

const companyProfileSchema = new Schema<ICompanyProfile>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    industry_type: {
      type: String,
      required: true,
      trim: true,
    },
    peoples: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+$/, "Invalid website URL format"],
    },
    follows: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const CompanyProfile = mongoose.model<ICompanyProfile>(
  "CompanyProfile",
  companyProfileSchema
);
