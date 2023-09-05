import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.PORT_DEV;

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();
