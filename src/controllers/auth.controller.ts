import {Request,Response} from "express"
import {UserModel} from "../models/user.model"
import bcrypt from "bcryptjs"

import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../util/jwt"
import { AuthRequest } from "../middleware/auth"

export const register = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body
        const extUser = await UserModel.findOne({ email })

        if(extUser){
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        await UserModel.create({
            name,
            email,
            password: hashedPassword,
            approve: true
        })

        res.status(201).json({ message: "User registered successfully"})
    }catch(err){
        res.status(500).json({ message: "Registration failed"})
    }
}

