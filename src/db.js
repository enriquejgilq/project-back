import 'dotenv/config'
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            try {
                await mongoose.connect(`mongodb+srv://project-backdb:TdSX0KDzk9LR1Bca@cluster0.edch4di.mongodb.net/project-backdb?retryWrites=true&w=majority`, {

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
