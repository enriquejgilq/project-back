import mongoose from "mongoose";

const aboutmeSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
    },
    other: {
        type: String,
        trim: true,
    },
    images: {
        type: Array
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    nickName: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

export default mongoose.model('AboutMe', aboutmeSchema)