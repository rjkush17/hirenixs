import { v2 as cloudinary } from "cloudinary";

interface TransformationSettings {
    width?: number;
    height?: number;
    crop?: string;
    gravity?: string;
    quality?: string;
    fetch_format?: string;
    flags?: string;
}

interface Transformations {
    profile: TransformationSettings[];
    post: TransformationSettings[];
    banner: TransformationSettings[];
}
interface UploadResult {
    link: string;
    publicID: string;
}

// Example transformations object
const transformations: Transformations = {
    profile: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto:eco", fetch_format: "auto", flags: "lossy" },
    ],
    post: [
        { width: 1200, height: 800, crop: "fill", gravity: "auto" },
        { quality: "auto", fetch_format: "auto", flags: "lossy" },
    ],
    banner: [
        { width: 1600, height: 400, crop: "fill", gravity: "auto" },
        { quality: "auto", fetch_format: "auto", flags: "lossy" },
    ],
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
    fileBuffer: Buffer,
    folderName: string,
    type: "profile" | "post" | "banner",
): Promise<UploadResult> => {
    const result = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: folderName,
                    transformation: transformations[type],
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as { secure_url: string; public_id: string });
                },
            );

            uploadStream.end(fileBuffer);
        },
    );
    console.log("cloudinary images upload result ==> ", result);
    return {
        link: result.secure_url,
        publicID: result.public_id,
    };
};

export const deleteImage = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Deleted:", result);
        return result;
    } catch (error) {
        console.error("Error deleting image:", error);
        return null;
    }
};
