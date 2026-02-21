import AsyncHandler from "express-async-handler"
import type {Response,Request} from 'express';
import User from "../models/user.model.ts";
import AppError from "../utils/appError.ts";
import friendRequestModel from "../models/friendRequest.model.ts";

interface params{
    id:string
}

export const getRecommendedUsers = AsyncHandler(async(req:Request,res:Response)=>{

    const currentUser = req.user;

    const reocommendedUsers = await User.find({
        $and:[
            {_id:{$ne:currentUser._id,$nin:currentUser.friends}}, // it means exclude currentUser user from it , //also exclude currentUser friends
            {isOnboarded:true}

        ]
    })

    res.status(200).json(
        {
            message:"Users got successfully",
            success:true,
            users:reocommendedUsers
        }
    )

})

export const getMyFriends = AsyncHandler(async(req:Request,res:Response)=>{

    const currentUser = req.user;

    //get all it's friends 

    const user = await User.findById(currentUser._id).select("friends").populate('friends',"fullname profilePicture nativeLanguage learningLanguage nativeCountryCode learningCountryCode location");

    res.status(200).json({
        message:'Your friends fetch successfully',
        success:true,
        friends:user?.friends
    })

})

export const sendFriendRequest = AsyncHandler(async(req,res)=>{

    const {id} = req.params;

    const currentUserDetails = req.user;


    if(!id){
        throw new AppError("Invalid request , Friend id is missing",400);
    }

    if(currentUserDetails._id.toString()===id){
       throw new AppError("You can't send friend request to yourself",400)
    }
    
    const receiverUser = await User.findById(id);

    if(!receiverUser){
        throw new AppError("Requested user doesn't exists",400);
    }

    //check if the user I am sending request is already my friend or not 

    if(receiverUser.friends.includes(currentUserDetails._id)){
        throw new AppError("You are already in friends of this user",400);
    }

    //check if friend re is already sent 

    const existingRequest = await friendRequestModel.findOne({
       $or:[
        {sender:currentUserDetails._id,receiver:id},
        {sender:id,receiver:currentUserDetails._id}
       ]
    })

    if(existingRequest){
        throw new AppError(`A Friend request already exists between you and this user ${id}`,400)
    }

    //now create friend request 

    const newFriendRequest = await friendRequestModel.create({
        sender:currentUserDetails._id,
        receiver:receiverUser._id
    })

    res.status(200).json(
        {
            message:"Friend request send successfully",
            success:true,
            request:newFriendRequest,
        }
    )

})

export const acceptFriendRequest = AsyncHandler(async(req:Request<params>,res)=>{

    const {id:requestId} = req.params;


    const friendRequest = await friendRequestModel.findById(requestId);

    //verify that current user in the receiver to accept friend request 

    if(friendRequest?.receiver.toString()!==req.user._id.toString()){
        throw new AppError("You are not authozied to accept this request",401);
    }

    //now update friend request status 

    friendRequest.status = 'accepted',
    await friendRequest.save();

    //now insert sender id into my frieds 

    await User.findByIdAndUpdate(friendRequest.receiver,{
        $addToSet:{friends:friendRequest.sender}
    })
     

    // and the sender will insert my id into his friends list 

    await User.findByIdAndUpdate(friendRequest.sender,{
        $addToSet:{friends:friendRequest.receiver}
    })

    res.status(200).json(
        {
            message:'Your friend request accepted',
            success:true,
            req:friendRequest
        }
    )

})

export const getFriendRequests = AsyncHandler(async(req,res)=>{

    const incomingRequests = await friendRequestModel.find({
        receiver:req.user._id,
        status:'pending'
    }).populate("sender","fullname profilePicture nativeLanguage learningLanguage")


    const acceptedRequests = await friendRequestModel.find({
        sender:req.user._id,
        status:'accepted'
    }).populate('receiver',"fullname profilePicture")




    res.status(200).json(
        {
            message:"Your all pending friend request fetch successfully",
            success:true,
            incomingReq:incomingRequests,
            acceptedReq:acceptedRequests
        }
    )
})


//this function means jisko mene request bhej di hai uske liye requestss sent ana chaiye ui me uskw liya banaya hai ye
export const getOutgoingFriendRequest = AsyncHandler(async(req,res)=>{

    const outgoingRequests = await friendRequestModel.find({
        sender:req.user._id,
        status:'pending'
    }).populate('receiver',"fullname profilePicture nativeLanguage learningLanguage")

    res.status(200).json({
        message:'Your all outgoing request fetch successfully',
        success:true,
        outgoingReq:outgoingRequests
    })

})