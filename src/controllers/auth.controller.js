import 'dotenv/config'
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json(["It's not authorized"])
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json(["It's not authorized"])
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json(["It's not authorized"])
        return res.json({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email,
            token: token
        })

    })
}

export const findUserProfile = async (req, res) => {
    const { nickname } = req.params;
    try {
        const userFound = await User.findOne({
            $or: [{ nickName: nickname }]
        });

        if (!userFound) {
            return res.status(400).json(["User not found"]);
        }

        res.json({
            id: userFound._id,
            nickName: userFound.nickName,
            userName: userFound.userName,
            works: userFound.works,
            socialMedia: userFound.socialMedia,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const userFound = await User.findById(id);

        if (!userFound) {
            return res.status(400).json(["User not found"]);
        }

        res.json({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email,
            works: userFound.works,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: 'User not found' })
    return res.json({
        id: userFound._id,
        userName: userFound.userName,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

export const register = async (req, res) => {

    const { email, password, userName, works, nickName, socialMedia } = req.body
    try {
        const userFound = await User.findOne({
            $or: [
                { email: email }, // Search by email
                { nickName: nickName } // Search by nickname
            ]
        });
        if (userFound) return res.status(400).json(['The user already exists'])
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            userName,
            email,
            works,
            nickName,
            socialMedia,
            password: passwordHash

        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id, nickName: userSaved.nickName })
        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            userName: userSaved.userName,
            nickName: userSaved.nickName,
            email: userSaved.email,
            works: userSaved.works,
            socialMedia: userSaved.socialMedia,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
            success: true,
            token: token
        })
    } catch (error) {
        res.status(500).json({ 'message': error.message, error: true })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userFound = await User.findOne({ email }).maxTimeMS(60000); // Agregar 15000 ms (15 segundos) de tiempo de espera
        if (!userFound) return res.status(400).json(["User not found"])

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json(['Incorrect password'])

        const token = await createAccessToken({ id: userFound._id, nickName: userFound.nickName })
        res.cookie("token", token)
        res.json({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email,
            works: userFound.works,
            nickName: userFound.nickName,
            socialMedia: userFound.socialMedia,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
            success: true,
            token: token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const logout = (req, res) => {
    res.cookie("token", "", { expires: new Date(0) })
    return res.sendStatus(200)


}








