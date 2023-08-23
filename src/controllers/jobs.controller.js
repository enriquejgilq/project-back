import Jobs from '../models/jobs.model.js'
import { uploadImg } from '../utils/cloudinary.js'


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
    console.log('Aqui??', req.body)
    console.log('no se', req.files?.images)
    try {
        const newJobs = new Jobs({
            title,
            description,
            technologies,
            link,
            user: req.user.id,
            nickName: req.user.nickName,
        });

        if (req.files?.images) {
            const imageResult = await uploadImg(req.files.images.tempFilePath);
            newJobs.images = imageResult;
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
        console.log(jobs);

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