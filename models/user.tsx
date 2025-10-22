import mongoose, { Document, Schema, Model} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    username: string;
    role: "user" | "company";
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
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
            required: true,
        },
        avatar: {
            type: String,
            trim: true,
            default: "",
        },
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["user", "company"],
            default: "user",
        },
        isVerified: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    { timestamps: true },
);

export const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>('User', userSchema)


