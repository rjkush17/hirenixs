import connectDB from "@/database/Database";
import { NextRequest, NextResponse } from "next/server";
import { User, IUser } from "@/models/user";
import SendMail from "@/lib/nodemailer/sendMail";
import genrateOTP from "@/utils/generateOTP";
import { LoginOTP, ILoginOTP } from "@/models/loginotp";
import type { mailDetailsType } from "@/lib/nodemailer/sendMail";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();
        const { identifier } = await request.json();

        const isRegistered: IUser | null = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });

        if (!isRegistered) {
            return NextResponse.json(
                { error: "User or Email not found" },
                { status: 400 },
            );
        }

        const Userotp: string = genrateOTP();
        const OTPgeneratedTime = Date.now();

        const mailBody: mailDetailsType = {
            from: "Hirenixs Team",
            to: isRegistered.email,
            subject: "login mail OTP ( testing )",
            text: Userotp,
        };
        const isSendComplete = await SendMail(mailBody);

        if (!isSendComplete) {
            return NextResponse.json(
                { error: "Failed to Send mail" },
                { status: 400 },
            );
        }

        const isOTPCreated: ILoginOTP | null = await LoginOTP.findOne({
            email: isRegistered.email,
        });

        if (isOTPCreated) {
            isOTPCreated.otp = Userotp;
            isOTPCreated.generatedTime = OTPgeneratedTime;
            await isOTPCreated.save();

            return NextResponse.json({ message: "OTP Resend Done" }, { status: 200 });
        }

        // Create new user
        const newLoginOTP: ILoginOTP = await LoginOTP.create({
            email: isRegistered.email,
            otp: Userotp,
            generatedTime: OTPgeneratedTime,
        });

        if (!newLoginOTP) {
            return NextResponse.json({
                error: "OTP not created due to technical issues",
            });
        }
        return NextResponse.json(
            { message: "Login OTP sent successfully" },
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
