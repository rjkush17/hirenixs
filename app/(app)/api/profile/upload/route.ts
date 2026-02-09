import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/database/Database";
import { IUser, User } from "@/models/user";
import { uploadToCloudinary, deleteImage } from "@/lib/cloudinary/cloudinary";

export const POST = async (request: NextRequest) => {
    try {
        await connectDB();
        const formData = await request.formData();
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized request" },
                { status: 401 },
            );
        }

        const email = formData.get("email");
        const file = formData.get("file");

        if (!email || !file) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const user: IUser | null = await User.findOne({ email });
        if (!user)
            return NextResponse.json({ error: "user not found" }, { status: 400 });

        // if (userID !== user._id) {
        //     return NextResponse.json(
        //         { error: "Given User ID not found with Register one" },
        //         { status: 400 },
        //     )
        // };

        if (user.avatar?.link || user.avatar?.publicID) {
            const isImageDeleted = await deleteImage(user.avatar.publicID);
            if (!isImageDeleted)
                return NextResponse.json(
                    {
                        error: "Erro while deleting previouse Images",
                    },
                    { status: 400 },
                );
        }

        if (!(file instanceof File)) {
            return NextResponse.json(
                { message: "Invalid file format" },
                { status: 400 },
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const { link, publicID } = await uploadToCloudinary(
            buffer,
            "hirenixs/profiles",
            "profile",
        );

        user.avatar = { link, publicID };

        try {
            await user.save();
            return NextResponse.json(
                { message: "Profile Image Uploaded", link, publicID },
                { status: 200 },
            );
        } catch (error) {
            console.error("Error saving user:", error);
            return NextResponse.json(
                { message: "Failed to upload profile image" },
                { status: 500 },
            );
        }
    } catch (error) {
        console.error("Error in POST route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
};
