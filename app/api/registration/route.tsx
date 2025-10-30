import { NextRequest, NextResponse } from "next/server";
import { IUser, User } from "@/models/user";
import connectDB from "@/database/Database";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

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

    // Create new user
    const newUser: IUser = await User.create({
      name,
      email,
      password: hashPassword,
      isVerified: false,
      onboardingVerified: false,
      providerName: "credentials",
      providerID: uuidv4(),
      username,
      role,
    });

    if (!newUser) {
      return NextResponse.json({
        error: "user not created due to technical issues",
      });
    }

    return NextResponse.json({
      message: "User registration successful",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
