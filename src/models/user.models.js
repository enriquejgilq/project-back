import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nickName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    socialMedia: {
        type: Array,
        required: true,
    },
    works: {
        type: Array,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)