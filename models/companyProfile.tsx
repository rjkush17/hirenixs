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
            max: 300,
        },
        industry_type: {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50,
        },
        location: {
            city: {
                type: String,
                trim: true,
                min: 1,
                max: 50,
            },

            state: {
                type: String,
                trim: true,
                min: 1,
                max: 50,
            },
        },
        website: {
            type: String,
            max: 300,
            trim: true,
            match: [/^https?:\/\/.+$/, "Invalid website URL format"],
        },
    },
    { timestamps: true },
);

export const CompanyProfile: Model<ICompanyProfile> =
    mongoose.models?.CompanyProfile ||
    mongoose.model<ICompanyProfile>("CompanyProfile", companyProfileSchema);
