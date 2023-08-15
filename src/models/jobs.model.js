import mongoose from "mongoose";

const worksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: Array
    },
    technologies: {
        type: Array,
    },
    link: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Jobs', worksSchema)