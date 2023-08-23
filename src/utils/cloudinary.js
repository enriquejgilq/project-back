import { v2 as cloudinary } from 'cloudinary';

const name = process.env.NAME_CLOUD
const key = process.env.API_KEY
const secret = process.env.KEY_SECRET

cloudinary.config({
    cloud_name: 'dfbvdqe4h',
    api_key: '734757915862827',
    api_secret: 'We2CnKkO5slL4Af7zB0KkXZamZ8'
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



