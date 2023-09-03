import AboutMe from '../models/aboutme.model.js'
import { uploadImg, deleteImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const getAllAboutme = async (req, res) => {

    try {
        const aboutme = await AboutMe.find({ user: req.user.id })
        if (aboutme.length === 0) {
            return res.status(404).json(["there is no information about the user"]);
        }
        const aboutmeData = aboutme.map(about => ({
            id: about._id,
            description: about.description,
            images: about.images,
            nickName: about.nickName,
            user: about.user,
            other: about.other
        }));
        res.json(aboutmeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching information' });
    }
}

export const getAboutme = async (req, res) => {

    try {
        const aboutme = await AboutMe.findById(req.params.id);
        if (!aboutme) {
            return res.status(404).json({
                message: "information not found"
            });
        }
        res.json(aboutme);
    } catch (error) {
        console.error('"error requesting the information" :', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

export const getAboutmePublic = async (req, res) => {
    const { nickname } = req.params;
    try {
        const latestAboutMe = await AboutMe.findOne({
            nickName: nickname
        }).sort({ _id: -1 });

        if (!latestAboutMe) {
            return res.status(400).json(["No data found for the provided nickname"]);
        }
        const aboutMeData = {
            id: latestAboutMe._id,
            description: latestAboutMe.description,
            images: latestAboutMe.images,
            other: latestAboutMe.other,
            nickName: latestAboutMe.nickName
        };

        res.json(aboutMeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching the information." });
    }
}

export const createAboutMe = async (req, res) => {
    const { description, other } = req.body;
    try {
        const newAboutme = new AboutMe({
            description,
            other,
            user: req.user.id,
            nickName: req.user.nickName,
        });

        if (req.files?.images) {
            const imageResult = await uploadImg(req.files.images.tempFilePath);
            newAboutme.images = { image: imageResult.secure_url, id: imageResult.public_id };
            await fs.unlink(req.files?.images.tempFilePath);
        }
        const savedAboutMe = await newAboutme.save();
        const hola = 'hola'
        res.json({ success: true, hola });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteAboutMe = async (req, res) => {

    try {
        const about = await AboutMe.findByIdAndDelete(req.params.id)
        if (!about) {
            return res.status(404).json({ message: 'Information not found' });
        }
        res.json(about);
    } catch (error) {
        console.error('Error in getJob:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

export const updateAboutme = async (req, res) => {

    try {
        const about = await AboutMe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!about) {
            return res.status(404).json({ message: 'information not found' });
        }
        res.json(about);
    } catch (error) {
        console.error('Error in the request:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}
