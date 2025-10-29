import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/database/Database";
import { User } from "@/models/user";
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

    const userID = formData.get("userID");
    const email = formData.get("email");
    const file = formData.get("file");

    if (!email || !file) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filedetails = await uploadToCloudinary(buffer, "hirenixs/profiles", 'profile');
    console.log(filedetails);

    const user = User.findOne({ _id: userID });

    //  if (!user._id && !user.email)
    //    NextResponse.json({ error: "User not found" }, { status: 401 });

    //  if (email !== user.email)
    //    NextResponse.json({ error: "Provided email not with DB email" });
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
