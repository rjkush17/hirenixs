import mongoose, { Schema, Types, Model, Document } from "mongoose";

export interface ICompanyProfile extends Document {
    userID: Types.ObjectId;
    industry_type: string;
    description: string;
    location: {
        city: string;
        state: string;
    };
    website?: string;
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
        description: {
            type: String,
            trim: true,
            min: 1,
            max: 500,
        },
        industry_type: {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 60,
        },
        location: {
            city: {
                type: String,
                trim: true,
                min: 1,
                max: 25,
            },

            state: {
                type: String,
                trim: true,
                min: 1,
                max: 25,
            },
        },
        website: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+$/, "Invalid website URL format"],
        },
    },
    { timestamps: true },
);

export const CompanyProfile: Model<ICompanyProfile> =
    mongoose.models?.CompanyProfile ||
    mongoose.model<ICompanyProfile>("CompanyProfile", companyProfileSchema);
