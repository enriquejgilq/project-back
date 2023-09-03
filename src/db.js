import 'dotenv/config'
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.NAME_DB}:${process.env.PASSDB}@${process.env.CLUSTER}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('>> DB is connected')
    } catch (error) {
        console.log(error)
    }
};
