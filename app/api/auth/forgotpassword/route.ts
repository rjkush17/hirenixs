import connectDB from "@/database/Database";
import { NextRequest, NextResponse } from "next/server";
import { User, IUser } from "@/models/user";
import crypto from "crypto-js";
import SendMail from "@/lib/nodemailer/sendMail";
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
    const resetToken: string = crypto.lib.WordArray.random(32).toString();
    console.log("resetToken", resetToken);

    const hashedToken = crypto.SHA256(resetToken).toString();

    isRegistered.resetPasswordToken = hashedToken;
    isRegistered.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await isRegistered.save();

    const encodedEmail = encodeURIComponent(isRegistered.email);
    const encodedToken = encodeURIComponent(resetToken);
    const url = `${process.env.BASE_URL}/auth/resetpassword?token=${encodedToken}&mail=${encodedEmail}`;

    const mailBody: mailDetailsType = {
      from: "Hirenixs Team",
      to: isRegistered.email,
      subject: "Forgot Passowrd Link",
      text: url,
    };
    const isSendComplete = await SendMail(mailBody);

    if (!isSendComplete) {
      return NextResponse.json(
        { error: "Failed to Send mail" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Reset Link Send to Register Mail" },
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
