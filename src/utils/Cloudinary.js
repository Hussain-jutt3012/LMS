import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UpLoadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        throw new Error("Cloudinary upload failed: File path is required");
    }

    try {
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto",
            }
        );

        return response;
    } catch (error) {
        throw new Error(
            `Cloudinary upload failed: ${error.message}`
        );
    } finally {
        if (localFilePath) {
            try {
                await fs.unlink(localFilePath);
            } catch (error) {
                // File may already be deleted
            }
        }
    }
};

export { UpLoadOnCloudinary };