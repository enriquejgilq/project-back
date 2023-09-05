import 'dotenv/config'
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            try {
                await mongoose.connect(process.env.MONGODB, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
            } catch (error) {
                console.log(' error 1', error);
            }
        } else {
            await mongoose.connect(`${process.env.BD_DEV}`)
        }
    } catch (error) {
        console.log(' error 2', error);
    }
};
