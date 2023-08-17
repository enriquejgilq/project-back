import Jobs from '../models/jobs.model.js'


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
    const { title, description, images, technologies, link } = req.body

    try {
        const newJobs = new Jobs({
            title, description, images, technologies, link, user: req.user.id
        })
        const savedJobs = await newJobs.save()
        res.json({ success: true, savedJobs })
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

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


export const getAlljobssById = async (req, res) => {
    try {
        const jobs = await Jobs.find({ user: req.params.id });
        const jobsData = jobs.map(jobs => ({
            id: jobs._id,
            title: jobs.title,
            description: jobs.description,
            technologies: jobs.technologies,
            link: jobs.link,
            images: jobs.images,
            createdAt: jobs.createdAt,
            updatedAt: jobs.updatedAt
        }));
        res.json(jobsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'User not found' });
    }
};