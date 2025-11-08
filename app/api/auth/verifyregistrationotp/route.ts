import { NextRequest, NextResponse } from "next/server";
import { UserOTP, IUserOTP } from "@/models/userotp";
import { User, IUser } from "@/models/user";
import connectDB from "@/database/Database";

interface ReqData {
  email: string;
  pin: string;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    await connectDB();
    const { pin, email }: ReqData = await request.json();

    const pinExist: IUserOTP | null = await UserOTP.findOne({ email });

    if (!pinExist) {
      return NextResponse.json(
        { error: "OTP not found in Database or expire" },
        { status: 400 },
      );
    }

    const currentTime = Date.now();
    const geneatedTime = pinExist.generatedTime;

    const fiveMin = 5 * 60 * 1000;

    if (geneatedTime + fiveMin < currentTime) {
      return NextResponse.json({ error: "OTP Expired" }, { status: 400 });
    }

    if (pin !== pinExist.otp) {
      return NextResponse.json(
        { error: "Incorrect OTP", isVerified: true },
        { status: 400 },
      );
    }

    const user: Partial<IUser> = {
      name: pinExist.name,
      email: pinExist.email,
      password: pinExist.password,
      username: pinExist.username,
      role: pinExist.role,
      onboardingVerified: true,
      providerName: "Credential",
      providerID: "OPTVerifiedRegistration",
    };

    const newUser = await User.create(user);
    if (newUser) {
      await UserOTP.deleteOne({ email });
    }

    return NextResponse.json(
      {
        message: "Verification complete now login ",
        userDetail: newUser,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("OTP Verification failed", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
