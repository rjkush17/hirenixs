import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import { UserOTP, IUserOTP } from "@/models/userotp";
import connectDB from "@/database/Database";
import bcrypt from "bcryptjs";
import genrateOTP from "@/utils/generateOTP";
import { otpMail } from "@/utils/mail/registrationOTPMail";
import sendMail from "@/lib/nodemailer/sendMail";
import type { mailDetailsType } from "@/lib/nodemailer/sendMail";

interface ReqData {
  email: string;
  password: string;
  name: string;
  role: "individual" | "organization";
  username: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectDB();

    const { email, password, name, role, username }: ReqData = await req.json();
    console.log({ email, password, name, role, username });
    const existingUser: string | null = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    const existingUsername: string | null = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 },
      );
    }
    // Password validation
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    // Name validation
    if (!name || name.length < 4) {
      return NextResponse.json(
        { error: "Name must be at least 4 characters long" },
        { status: 400 },
      );
    }
    // Role validation
    if (role !== "individual" && role !== "organization") {
      return NextResponse.json(
        { error: "Role must be either 'individual' or 'organization'" },
        { status: 400 },
      );
    }
    // Hash password
    const salt: string = bcrypt.genSaltSync(10);
    const hashPassword: string = bcrypt.hashSync(password, salt);

    // Generating genrating OTP
    const Userotp: string = genrateOTP();
    const OTPgeneratedTime = Date.now();

    // mail otp and body data
    const htmlBody: string = otpMail(Userotp);
    const mailData: mailDetailsType = {
      from: "Hirenixs",
      to: email,
      subject: "OTP for the Hirenixs Registration",
      html: htmlBody,
    };
    await sendMail(mailData);
    console.log(1);

    const isOPTCreated: IUserOTP | null = await UserOTP.findOne({ email });

    if (isOPTCreated) {
      isOPTCreated.otp = Userotp;
      isOPTCreated.generatedTime = OTPgeneratedTime;
      isOPTCreated.save();
      console.log(2);

      return NextResponse.json({ message: "OTP Resend Done" }, { status: 200 });
    }
    console.log(3);

    // Create new user
    const newUserOTP: IUserOTP = await UserOTP.create({
      name,
      email,
      password: hashPassword,
      username,
      otp: Userotp,
      role,
      generatedTime: OTPgeneratedTime,
    });
    console.log(4);

    if (!newUserOTP) {
      return NextResponse.json({
        error: "OTP not created due to technical issues",
      });
    }

    return NextResponse.json({
      message: "User registration successful",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
