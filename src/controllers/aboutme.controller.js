import AboutMe from '../models/aboutme.model.js'

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

    try {
        const about = await AboutMe.findOne({ nickName: req.params.nickname })
            .sort({ createdAt: -1 })
            .limit(1);
        if (!about) {
            return res.status(404).json(['No information found for the given nickname']);
        }
        const aboutMeData = {
            id: about._id,
            description: about.description,
            images: about.images,
            other: about.other,
            nickName: about.nickName
        };
        res.json(aboutMeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching the information." });
    }
}
export const createAboutMe = async (req, res) => {

    const { description, images, other } = req.body
    try {
        const newAboutme = new AboutMe({
            description, images, other,
            user: req.user.id, nickName: req.user.nickName,
        })
        const savedAboutme = await newAboutme.save()
        res.json({ success: true, savedAboutme })
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}
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
