import {User} from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Registration = async(req,res) =>{
    try{
        const{name,username,email,password} = req.body;
        // if any of the fields are empty.
        if(!name || !username || !email || !password){
            return res.status(401).json({
                message:"All fields are required.",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User Already registered",
                success:false
            })
        }
        const hashedPassword = await bcryptjs.hash(password,16);
        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message:"Account Created Successfully.",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

export const Login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"All fields are required.",
                success:false
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"User does not exists !",
                success:false
            })
        }
        const passMatch = await bcryptjs.compare(password,user.password);
        if(!passMatch){
            return res.status(401).json({
                message:"Incorrect password !",
                success:false
            }) 
        }
        const tokenData={
            userID:user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_ENCRYPTION,{expiresIn:"1D"})
        return res.status(201).cookie("token", token, {expiresIn:"1D",httpOnly:true}).json({
            message:`Welcome back ${user.name}`,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}

export const logout = async(req,res) =>{
    return res.cookie("token", "", {expiresIn:new Date(Date.now())}).json({
        message:"Logged out Successfully !",
        success:"True"
    })
}

export const bookmarks = async(req,res)=>{
    try{
        const loggedInUser = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUser);
        if(user.bookmark.includes(tweetId)){
            await User.findByIdAndUpdate(loggedInUser, {$pull:{bookmarks:tweetId}});
            return res.status(200).json({
                message:"Removed the bookmark."
            });
        }else{
            await User.findByIdAndUpdate(loggedInUser, {$push:{bookmarks:tweetId}});
            return res.status(200).json({
                message:"Added the bookmark."
            });
        }
    }
    catch(error){
        console.log(error);
    }
}

export const getMyProfile = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        })
    }catch(error){
        console.log(error);
    }
}

export const getOtherUsers = async (req,res)=>{
    try{
        const {id} = req.params;
        const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
        if(!otherUsers){
            return res.status(401).json({
                message:"No users in the database"
            })
        };
        return res.status(200).json({
            otherUsers
        })
    }catch(error){
        console.log(error);
    }
}

export const follow = async(req,res)=>{
    try{

    }catch(error){
        console.log(error);
    }
}