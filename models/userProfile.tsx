import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMonthYear {
    month: number;
    year: number; 
}

export interface IUserProfile extends Document {
    userID: mongoose.Schema.Types.ObjectId;

    title?: string;
    bio?: string;
    skills?: string[];

    experience?: {
        company: string;
        title: string;
        description: string;
        isPresent?: boolean;
        startDate: IMonthYear;
        endDate?: IMonthYear;
    }[];

    education?: {
        institute: string;
        course: string;
        startDate: IMonthYear;
        endDate?: IMonthYear;
        description?: string;
    }[];

    social?: {
        platform: string;
        url: string;
    }[];

    connection?: {
        userID: mongoose.Schema.Types.ObjectId;
        status: "connected" | "received" | "sent";
    }[];

    savedJobs?: {
        jobID: mongoose.Schema.Types.ObjectId;
    }[];

    createdAt: Date;
    updatedAt: Date;
}

const MonthYearSchema = new Schema(
    {
        month: {
            type: Number,
            min: 0,
            max: 11,
            required: true,
        },
        year: {
            type: Number,
            min: 1915,
            max: 9999,
            required: true,
        },
    },
    { _id: false },
);

const userProfileSchema = new Schema<IUserProfile>(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
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

        skills: {
            type: [String],
            trim: true,
            minlength: 2,
            default: undefined,
        },

        experience: {
            type: [
                {
                    company: { type: String, trim: true, required: true },
                    title: { type: String, trim: true, required: true },
                    description: { type: String, trim: true },
                    isPresent: { type: Boolean, default: false },
                    startDate: { type: MonthYearSchema, required: true },
                    endDate: { type: MonthYearSchema },
                },
            ],
            default: undefined,
        },

        education: {
            type: [
                {
                    institute: { type: String, trim: true, required: true },
                    course: { type: String, trim: true, required: true },
                    startDate: { type: MonthYearSchema, required: true },
                    endDate: { type: MonthYearSchema },
                    description: { type: String, trim: true },
                },
            ],
            default: undefined,
        },

        social: {
            type: [
                {
                    platform: { type: String, trim: true, required: true },
                    url: { type: String, trim: true, required: true },
                },
            ],
            default: undefined,
        },

        connection: {
            type: [
                {
                    userID: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                    },
                    status: {
                        type: String,
                        enum: ["connected", "received", "sent"],
                        required: true,
                    },
                },
            ],
            default: undefined,
        },

        savedJobs: {
            type: [
                {
                    jobID: {
                        type: Schema.Types.ObjectId,
                        ref: "Job",
                        required: true,
                    },
                },
            ],
            default: undefined,
        },
    },
    { timestamps: true },
);

export const UserProfile: Model<IUserProfile> =
    mongoose.models.UserProfile ||
    mongoose.model<IUserProfile>("UserProfile", userProfileSchema);
