import connectDB from "@/database/Database";
import { NextRequest, NextResponse } from "next/server";
import { OnboardingSchema } from "@/lib/zod/individualProfile";
import z from "zod";
import { User, IUser } from "@/models/user";
import { IUserProfile, UserProfile } from "@/models/userProfile";
import { auth } from "@/auth";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();
        const { userID, data } = await req.json();

        if (!userID)
            return NextResponse.json({ error: "User ID not found" }, { status: 401 });

        const session = await auth();
        const id = session?.user?.id;

        if (!session && !id) {
            return NextResponse.json(
                { error: "Unauthorized required" },
                { status: 401 },
            );
        }

        if (userID !== id) {
            return NextResponse.json(
                {
                    error: "session ID not same as provided by request",
                },
                { status: 200 },
            );
        }

        let cleanData;
        try {
            cleanData = OnboardingSchema.parse(data);
        } catch (error) {
            console.log("error in zod validation ", error);
            if (error instanceof z.ZodError) {
                console.log("zod issues: ", error.issues);
                console.log("Field errors:", error.flatten().fieldErrors);
                console.log("error instanceof zod ", error);
            }
            return NextResponse.json(
                { error: "error while parsing data to zod" },
                { status: 400 },
            );
        }

        const user: IUser | null = await User.findOne({ _id: userID });

        let userProfile: IUserProfile | null = await UserProfile.findOne({
            userID,
        });

        if (!user)
            return NextResponse.json(
                { error: "user and its profile not found " },
                { status: 400 },
            );

        if (user.role !== "individual") {
            return NextResponse.json(
                { error: "user profile type no found or incorrect" },
                { status: 400 },
            );
        }

        if (!userProfile) {
            userProfile = new UserProfile({
                userID,
                ...cleanData,
            });
        } else {
            Object.assign(userProfile, cleanData);
        }

        await userProfile.save();
        user.onboardingVerified = true;
        await user.save();

        return NextResponse.json(
            { message: "User Profile Saved" },
            { status: 200 },
        );
    } catch (error) {
        console.log("error in the oboarding individual", error);
        return NextResponse.json(
            { error: "internal server Error" },
            { status: 400 },
        );
    }
};
