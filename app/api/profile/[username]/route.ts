import connectDB from "@/database/Database";
import { IUser, User } from "@/models/user";
import { IUserProfile, UserProfile } from "@/models/userProfile";
import { ICompanyProfile, CompanyProfile } from "@/models/companyProfile";
import { NextRequest, NextResponse } from "next/server";

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
        const user: IUser | null = await User.findOne({
            username: username,
        })
            .select("name email username role avatar")
            .lean<IUser>();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.role === "individual") {
            const userProfile: IUserProfile | null = await UserProfile.findOne({
                userID: user._id,
            })
                .select(
                    "userID title bio skills experience education social connection savedJobs",
                )
                .lean<IUserProfile>();
            if (userProfile) {
                return NextResponse.json({
                    message: "User data fetched successfully",
                    user,
                    userProfile,
                });
            }
            return NextResponse.json({
                message: "User data fetched successfully",
                user,
            });
        }

        if (user.role === "organization") {
            const companyProfile: ICompanyProfile | null =
                await CompanyProfile.findOne({
                    userID: user._id,
                })
                    .select("userID industry_type description location website")
                    .lean<ICompanyProfile>();
            if (companyProfile) {
                return NextResponse.json({
                    message: "User data fetched successfully",
                    user,
                    companyProfile,
                });
            }
            return NextResponse.json({
                message: "User data fetched successfully",
                user,
            });
        }
        return NextResponse.json({
            message: "User data fetched successfully",
            user,
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
