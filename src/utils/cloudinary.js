import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
    cloud_name: process.env.NAME_CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.KEY_SECRET
});


export const uploadImg = async (filePath) => {
    try {
        return await cloudinary.uploader.upload(filePath, {
            folder: 'replit'
        })
    }
    catch (error) {
        throw new Error('Error uploading image to Cloudinary');
    }

}

export const deleteImage = async (publicId) => {
    try {
        return await cloudinary.uploader.destroy(publicId)
    }
    catch (error) {
        throw new Error('Error uploading image to Cloudinary');
    }
}



