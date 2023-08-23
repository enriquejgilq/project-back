import { v2 as cloudinary } from 'cloudinary';

const name = process.env.NAME_CLOUD
const key = process.env.API_KEY
const secret = process.env.KEY_SECRET

cloudinary.config({

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



