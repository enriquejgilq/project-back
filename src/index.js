import 'dotenv/config'
import app from './app.js'
import { connectDB } from './db.js'

connectDB();
if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT)
    console.log('server on port', process.env.PORT)
} else {
    app.listen(process.env.PORT_DEV)
    console.log('server on port', process.env.PORT_DEV)
}



