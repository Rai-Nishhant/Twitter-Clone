import { Post } from "../models/postSchema.js";

export const createTweet = async(req,res)=>{
    try{
        const {description, id} = req.body;
        if(!description || !id){
            return res.status(401).json({
                message:"All fields are required",
                success:false
            });
        };
        await Post.create({
            description,
            userId : id
        });
        return res.status(201).json({
            message:"Tweet Created Successfully",
            success:true,
        })
    }catch(error){
        console.log(error);
    }
}

export const deleteTweets = async (req,res) =>{
    try{
        const {id} = req.params;
        await Post.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

export const likeOrDislike = async(req,res)=>{
    try{
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Post.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            await Post.findByIdAndUpdate(tweetId, {$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet"
            })
        }else{
            await Post.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet"
            })
        }
    }
    catch(error){
        console.log(error);
    }
}

