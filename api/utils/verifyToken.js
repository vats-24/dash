import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next) => {
    const token = req.cookies.access_token;

    if(!token) return next(createError(401,"Not Authenticated"))

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Invalid Token"))
        req.user = user
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) next()
        else{
            return next(createError(403,"User Not Authorized"))
    }
    })
}

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next, ()=>{
        if(req.user.isAdmin) next()
        else{
            return next(createError(403,"User Not Authorized"))
    }
    })
}