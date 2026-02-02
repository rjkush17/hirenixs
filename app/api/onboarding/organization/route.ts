import { auth } from "@/auth";
import connectDB from "@/database/Database";
import { NextRequest, NextResponse } from "next/server";
import { OrganizationSchema } from "@/lib/zod/organizationProfile";
import z from "zod";
import { User, IUser } from "@/models/user";
import { CompanyProfile, ICompanyProfile } from "@/models/companyProfile";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();
        const { email, data } = await req.json();
        if (!email)
            return NextResponse.json({ error: "Email not found" }, { status: 400 });

        const session = await auth();
        const userEmail = session?.user?.email;

        if (!session && !userEmail) {
            return NextResponse.json(
                { error: "Unauthorized required" },
                { status: 401 },
            );
        }

        if (email !== userEmail)
            return NextResponse.json(
                { error: "session ID not same as provided by request" },
                { status: 200 },
            );

        let cleanData;
        try {
            cleanData = OrganizationSchema.parse(data);
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

        const user: IUser | null = await User.findOne({ email });
        if (!user)
            return NextResponse.json(
                { error: "User and its profile not found" },
                { status: 400 },
            );
        if (user.role !== "organization") {
            return NextResponse.json(
                { error: "user role type no found or incorrect" },
                { status: 400 },
            );
        }

        let companyProfile: ICompanyProfile | null = await CompanyProfile.findOne({
            userID: user._id,
        });

        if (cleanData.name) {
            user.name = cleanData.name;
        }
        delete cleanData?.name;

        if (!companyProfile) {
            companyProfile = new CompanyProfile({
                userID: user._id,
                ...cleanData,
            });
        } else {
            Object.assign(companyProfile, cleanData);
        }

        await companyProfile.save();
        user.onboardingVerified = true;
        await user.save();

        return NextResponse.json(
            { message: "User Profile Saved" },
            { status: 200 },
        );
    } catch (error) {
        console.log("error in the organization onboarding api ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
};
