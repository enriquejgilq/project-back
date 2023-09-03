import 'dotenv/config'
import app from './app.js'
import { connectDB } from './db.js'

connectDB();
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT)
} else {
    app.listen(process.env.PORT)
}



console.log('server on port', 3002)