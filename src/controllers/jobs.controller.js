import Jobs from '../models/jobs.model.js'
import { uploadImg, deleteImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'


export const getJobs = async (req, res) => {

    try {
        const jobs = await Jobs.find({ user: req.user.id })

        if (!jobs) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(jobs);
    } catch (error) {
        console.error('Error in getJob:', error);
        res.status(500).json({ message: 'An error occurred' });
    }



}
export const createJobs = async (req, res) => {
    const { title, description, technologies, link } = req.body;
    try {
        const newJobs = new Jobs({
            title,
            description,
            technologies: technologies ? technologies.split(',') : [],
            link,
            user: req.user.id,
            nickName: req.user.nickName,
        });

        if (req.files?.images) {
            if (Array.isArray(req.files.images)) {
                const imagePromises = req.files.images.map(async (image) => {
                    const imageResult = await uploadImg(image.tempFilePath);
                    await fs.unlink(image.tempFilePath);
                    return { image: imageResult.secure_url, id: imageResult.public_id };
                });
                newJobs.images = await Promise.all(imagePromises);

            } else {
                const imageResult = await uploadImg(req.files.images.tempFilePath);
                newJobs.images = { image: imageResult.secure_url, id: imageResult.public_id };
                await fs.unlink(req.files?.images.tempFilePath);
            }
        }
        const savedJobs = await newJobs.save();
        res.json({ success: true, savedJobs });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getJob = async (req, res) => {
    try {
        const job = await Jobs.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        console.error('Error in getJob:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
export const deleteJobs = async (req, res) => {
    try {
        const job = await Jobs.findByIdAndDelete(req.params.id)
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.images.length > 0) {
            async function deleteAllImages(job) {
                const imageDeletePromises = job.images.map(async (image) => {
                    const imageURL = image.id;
                    await deleteImage(imageURL);
                    return imageURL;
                });
                const deletedImageURLs = await Promise.all(imageDeletePromises);
                return deletedImageURLs;
            }
            const deletedImageURLs = await deleteAllImages(job);
        }
        res.json(job);
    } catch (error) {
        console.error('Error in getJob:', error);
        res.status(500).json({ message: 'An error occurred' });
    }

}
export const updatejobs = async (req, res) => {

    try {
        const jobs = await Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!jobs) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(jobs);
    } catch (error) {
        console.error('Error in getJob:', error);
        res.status(500).json({ message: 'An error occurred' });
    }

}

export const getAlljobssByNickName = async (req, res) => {
    try {
        const jobs = await Jobs.find({ nickName: req.params.nickname });

        if (jobs.length === 0) {
            return res.status(404).json(['No jobs found for the given nickname']);
        }

        const jobsData = jobs.map(job => ({
            id: job._id,
            title: job.title,
            description: job.description,
            technologies: job.technologies,
            link: job.link,
            images: job.images,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt
        }));

        res.json(jobsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching jobs' });
    }
};