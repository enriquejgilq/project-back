import 'dotenv/config'
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            const conected = await mongoose.connect(`${process.env.NAME_DB}:${process.env.PASSDB}@${process.env.CLUSTER}/${process.env.NAME_DB_COMPLEMENT}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(conected)
        } else {
            const conected = await mongoose.connect(`${process.env.NAME_DB}:${process.env.PASSDB}@${process.env.CLUSTER}/${process.env.NAME_DB_COMPLEMENT}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            //   await mongoose.connect(`${process.env.BD_DEV}`)
        }
    } catch (error) {
        console.log(error)
        console.log(error)
    }
};
