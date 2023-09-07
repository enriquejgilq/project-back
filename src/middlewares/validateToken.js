import 'dotenv/config'
//require('dotenv').config()
import jwt from "jsonwebtoken"


export const authRequired = (req, res, next) => {
    // const { token } = req.cookies
    const authorizationHeader = req.headers['authorization'];

    // Verifica si se incluyó el encabezado de autorización
    if (!authorizationHeader) return res.status(401).json(["It's not authorized 1"]);

    // Divide el encabezado de autorización para obtener el token
    const token = authorizationHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' })
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' })
        req.user = user
        next()
    })

}