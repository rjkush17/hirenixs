import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/Database";
import { User, IUser } from "@/models/user";
import bcrypt from "bcryptjs";
import crypto from "crypto-js";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();
        const { password, confirmPassword, token, email } = await request.json();

        console.log({
            password,
            confirmPassword,
            token,
            email,
        });

        if (!password || !confirmPassword || !token || !email) {
            return NextResponse.json(
                { error: "One of Required field Not Found" },
                { status: 400 },
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "confirmpassword not matched with password" },
                { status: 400 },
            );
        }

        const user: IUser | null = await User.findOne({ email }).select(
            "email password resetPasswordToken resetPasswordExpire",
        );

        if (!user) {
            return NextResponse.json(
                { error: "Not any register email found with this" },
                { status: 400 },
            );
        }

        if (!user.resetPasswordToken || !user.resetPasswordExpire) {
            return NextResponse.json(
                { error: "reset token or expire data not found " },
                { status: 400 },
            );
        }

        const hashedToken: string = crypto.SHA256(token).toString();

        if (hashedToken !== user.resetPasswordToken) {
            return NextResponse.json(
                { error: "your token not matched with stored token" },
                { status: 400 },
            );
        }

        const currentTime = Date.now();

        if (currentTime > user.resetPasswordExpire) {
            return NextResponse.json({
                error: "token  Expire please geenrate new request",
            });
        }
        const hashedPassword: string = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        return NextResponse.json(
            { message: "New Password Updated" },
            { status: 200 },
        );
    } catch (error) {
        console.log("get error in the forgot password route ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
};
