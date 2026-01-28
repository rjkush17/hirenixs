import connectDB from "@/database/Database";
import { User } from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

type UserType = {
    _id: Types.ObjectId;
    email: string;
    role?: "individual" | "organization";
};

export const PATCH = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();

        const { email, role } = await request.json();

        if (role !== "individual" && role !== "organization")
            return NextResponse.json(
                { error: "Invalid user type found" },
                { status: 400 },
            );

        if (!email)
            return NextResponse.json({ error: "email ID required" }, { status: 400 });
        const user = await User.findOne({ email })
            .select("_id email role")
            .lean<UserType>();

        if (!user) {
            return NextResponse.json(
                { error: "Registered email not found" },
                { status: 404 },
            );
        }

        if (user.role) {
            return NextResponse.json(
                { error: "Role already assigned" },
                { status: 409 },
            );
        }

        const result = await User.updateOne({ email }, { $set: { role } });

        console.log("result in update role route : ", result);

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { error: "Failed to update role" },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { message: "User role updated successfully" },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error in update profile route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
};
