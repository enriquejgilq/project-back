import mongoose from "mongoose";

const aboutmeSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
    },
    images: {
        secure_url: String,
        public_id: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    other: {
        type: String,
        trim: true,
    },
    nickName: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

export default mongoose.model('AboutMe', aboutmeSchema)