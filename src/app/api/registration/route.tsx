import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDB from "@/database/Database";
import bcrypt from "bcryptjs";
import { clear } from "console";

export const POST = async (req: NextRequest) => {
    try {
        await connectDB();
        const { email, password, name, role, username } = await req.json();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 },
            );
        }

        const existingUsername = await User.findOne({ username });

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
        if (role !== "user" && role !== "company") {
            return NextResponse.json(
                { error: "Role must be either 'user' or 'company'" },
                { status: 400 },
            );
        }
        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            isVerified: false,
            username,
            role,
        });

        console.log(newUser)

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
