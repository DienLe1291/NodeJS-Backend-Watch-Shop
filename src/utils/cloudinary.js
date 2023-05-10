import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudinaryV2 = cloudinary.v2;

const cloudName = process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinaryV2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
})

export default cloudinaryV2;
