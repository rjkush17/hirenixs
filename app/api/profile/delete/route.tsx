import connectDB from "@/database/Database";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary/cloudinary";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await connectDB();
        const { email, publicID }: { email: string; publicID: string } =
            await request.json();

        if (!email || !publicID)
            return NextResponse.json({ error: "email or Images ID is messing" });
        const user = await User.findOne({ email });

        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 400 });

        const deleted = await deleteImage(publicID);

        if (!deleted)
            return NextResponse.json(
                { error: "deleting images failed" },
                { status: 400 },
            );

        user.avatar = undefined;
        await user.save();

        return NextResponse.json(
            { message: "images Delete sucessfull" },
            { status: 200 },
        );
    } catch (error: unknown) {
        console.log("error while in images error", error);
        return NextResponse.json({ error: "Internal Server error" });
    }
}
