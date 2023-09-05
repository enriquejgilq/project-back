import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';



async function startServer() {
    const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT || 8080 : process.env.PORT_DEV;
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
