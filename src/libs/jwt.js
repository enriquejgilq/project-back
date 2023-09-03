import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'



export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
    })



}

