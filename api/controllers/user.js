import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register =  async (req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
    
        await newUser.save();
        res.status(200).json("User has been created")
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next) =>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User"))
    
        const correctPassword = bcrypt.compare(
            req.body.password,
            user.password
        ) 
    
        if(!correctPassword) return next(createError(401),"Username or Password is Incorrect")
    
        const token = jwt.sign({
            userId : user._id,
            role: user.isAdmin
        },process.env.JWT,{
            expiresIn : "2h"
        }
        )
    
    res.cookie("access_token",token,{
            httpOnly: true
        })
        .status(200)
        .json({message:"success",details: user._doc})
    } catch (error) {
        next(error)
    }
}