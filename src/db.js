import 'dotenv/config'
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            try {
                await mongoose.connect(`${process.env.NAME_DB}:${process.env.PASSDB}@${process.env.CLUSTER}/${process.env.NAME_DB_COMPLEMENT}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            await mongoose.connect(`${process.env.BD_DEV}`)
        }
    } catch (error) {
        console.log(error)
        console.log(error)
    }
};
