import connectDB from "@/database/Database";
import { IUser, User } from "@/models/user";
import { IUserProfile, UserProfile } from "@/models/userProfile";
import { ICompanyProfile, CompanyProfile } from "@/models/companyProfile";
import { NextRequest, NextResponse } from "next/server";

import {
    ProfileType,
    Education,
    Experience,
    User as UserHeader,
    SocialLinks,
    About,
} from "@/types/profile";
import { removeEmptyFields } from "@/utils/removeEmptyFields";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ username?: string }> },
): Promise<NextResponse> {
    try {
        const { username } = await params;

        if (!username) {
            return NextResponse.json(
                { error: "username is required" },
                { status: 400 },
            );
        }

        await connectDB();

        const user = await User.findOne({ username })
            .select("name email username role avatar")
            .lean<IUser>();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.role) {
            return NextResponse.json(
                { error: "User profile type not found" },
                { status: 400 },
            );
        }

        const profiletype: ProfileType = user.role;

        const userheader: UserHeader = {
            name: user.name,
            username: user.username,
            avatar: user.avatar,
        };

        let skills: string[] = [];
        let experience: Experience[] = [];
        let education: Education[] = [];
        let socialLinks: SocialLinks[] = [];
        let about: About | null = null;

        if (profiletype === "individual") {
            const userProfile = await UserProfile.findOne({
                userID: user._id,
            })
                .select("title bio skills experience education social")
                .lean<IUserProfile>();

            if (userProfile) {
                userheader.title = userProfile.title;
                userheader.description = userProfile.bio;

                skills = userProfile.skills || [];
                experience = userProfile.experience || [];
                education = userProfile.education || [];
                socialLinks = userProfile.social || [];
            }
        }

        if (profiletype === "organization") {
            const companyProfile = await CompanyProfile.findOne({
                userID: user._id,
            })
                .select("industry_type description location website employee")
                .lean<ICompanyProfile>();

            if (companyProfile) {
                userheader.title = companyProfile.industry_type;
                userheader.description = companyProfile.description;

                about = {
                    location: companyProfile.location,
                    website: companyProfile.website,
                };
            }
        }
        const response = removeEmptyFields({
            userheader,
            skills,
            experience,
            education,
            socialLinks,
            about,
            profiletype,
        });

        return NextResponse.json({
            message: "User data fetched successfully",
            response,
            userID: user?._id,
            email: user?.email,
        });
    } catch (error) {
        console.error("Internal Server Error:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
