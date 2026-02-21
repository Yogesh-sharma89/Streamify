import AsyncHandler from "express-async-handler"
import AppError from "../utils/appError.ts";
import User from "../models/user.model.ts";
import otpGenerator from 'otp-generator';
import bcrypt from "bcryptjs";
import redisClient from "../config/redis.ts";
import  { sendOtpVerificationEmail } from "../config/nodemailer.ts";
import isEmailValid from "../utils/validEmail.ts";
import generateJwtToken from "../utils/generateToken.ts";
import { upsertStreamUser } from "../config/stream.ts";
import axios from "axios";

export interface signupData{
    fullname: string;
    email: string;
    password: string;
    agree: boolean;
}

export const Signup = AsyncHandler(async(req,res)=>{

    const {otp,email} = req.body;

    const data = await redisClient.get(`signup:${email}`);

    if(!data){
      throw new AppError("Signup sesion expired",401);
    }

    let signupData :signupData ;

   
    signupData = JSON.parse(data);

    if(!signupData){
      throw new AppError("No user data found!",404)
    }

    console.log(signupData);

    const {fullname,password,agree} = signupData ;

    if(!fullname || !email || !password || agree===false){
        throw new AppError('All fields are required',400);
    }

    if(password.length<6){
        throw new AppError('Min. length of password should be 6',400);
    }

    const isValid = isEmailValid(email);

    if(!isValid){
       throw new AppError('Invalid email format',400)
    }
    
    const storedOtp = await redisClient.get(`otp:${email}`);

    if(!storedOtp){
      throw new AppError('OTP expired!',401)
    }

    const isMatch = await bcrypt.compare(otp,storedOtp);

    if(!isMatch){
      throw new AppError('Invalid OTP!',400);
    }

    const randomNumber = Math.floor(Math.random()*100)+1;

    const randomAvatar = `https://avatar.iran.liara.run/username?username=${fullname}`;

    const newUser = await User.create({
      fullname,
      email,
      password,
      profilePicture:randomAvatar,
      agree

    })

    //genrate stream user 

    await upsertStreamUser({
      id:newUser._id.toString(),
      name:newUser.fullname,
      image:newUser.profilePicture || ""
    }) 

    const token =  generateJwtToken(newUser);

    res.cookie('token',token,{
      maxAge:1000*60*60*24*4,
      httpOnly:true,
      sameSite:'strict',
      secure:process.env.NODE_ENV === 'production'
    });

    //now delete otp 

    await redisClient.del(`signup:${email}`);

    await redisClient.del(`otp:${email}`);

    res.status(201).json(
      {
        message:'User signed up successfully',
        success:true,
        user:newUser
      }
    )

})

export const Login = AsyncHandler(async(req,res)=>{

  const {email,password} = req.body;

  if(!email || !password){
    throw new AppError('Email and password are required',400);
  }

  const isValid = isEmailValid(email);

  if(!isValid){
    throw new AppError('Invalid email format',400);
  }

  const existingUser = await User.findOne({email});
  
  if(!existingUser){
    throw new AppError('Email not registered. Please signup to continue',401);
  }

  //check password 

  const isPasswordMatch = await bcrypt.compare(password,existingUser.password);

  if(!isPasswordMatch){
    throw new AppError("Invalid password",400);
  }

  const token = generateJwtToken(existingUser);

  res.cookie('token',token,{
      maxAge:1000*60*60*24*4,
      httpOnly:true,
      sameSite:'strict',
      secure:process.env.NODE_ENV === 'production'
    });

  
    res.status(200).json(
      {
        message:'Login successfully',
        success:true
      }
    )

})

export const Logout = AsyncHandler(async(req,res)=>{

  res.clearCookie('token',{
    httpOnly:true,
    secure:process.env.NODE_ENV ==='production',
    sameSite:'strict',

  });

   res.status(200).json(
    {
      message:'Logout successfully',
      success:true
    }
  )

})

export const sendOtp = AsyncHandler(async(req,res)=>{

  const {email,password,fullname,agree} = req.body;

  if(!email ||!password || !fullname){
    throw new AppError("All fields are required",400)
  }

  if(!email){
    throw new AppError('Email is required',400);
  }

  const existingUser = await User.findOne({email});

  if(existingUser){
    throw new AppError('Email already exits. Please login to continue',400)
  }

  //generate otp 

  const otp = otpGenerator.generate(6,{lowerCaseAlphabets:true,upperCaseAlphabets:false,specialChars:false});

  //hash otp 

  const hashedOtp = await bcrypt.hash(otp,10);

  //save opt in redis 

  await redisClient.set(`otp:${email}`,hashedOtp,{
    EX:300 // opt expire in 5 minutes
  });

  //save signup data temp. in redis 

  const signupData = {fullname,email,password,agree}

  await redisClient.set(`signup:${email}`,JSON.stringify(signupData));

  //send email 

  await sendOtpVerificationEmail(email,otp);

  res.status(200).json({
    message:"OTP sent successfully",
    success:true,
  })

})

export const OnBoarding   = AsyncHandler(async(req,res)=>{

  const userId = req.user?._id;

  if(!userId){
    throw new AppError("Unauthorized access",401);
  }

  const {fullname,bio,nativeLanguage,learningLanguage,location,profilePicture,nativeCountryCode,learningCountryCode} = req.body;

  if(!fullname || !bio || !nativeLanguage || !learningLanguage || !location){
    throw new AppError("All fields are required",400);
  }

  if(fullname.length<3){
    throw new AppError("Invalid name",400);
  }

  if(bio.length>500){
    throw new AppError("Invalid length of bio. Maximum length is 500 characters",400);
  }

  //now updated user ;

  const updatedUser =  await User.findByIdAndUpdate(userId,{
    fullname,
    bio,
    nativeLanguage,
    learningLanguage,
    location,
    isOnboarded:true,
    profilePicture,
    nativeCountryCode,
    learningCountryCode
   },{new:true,runValidators:true}).select("-password")

   if(!updatedUser){
    throw new AppError("User not found!",404);
   }

   //update upstrea user 

   await upsertStreamUser({
    id:updatedUser._id.toString(),
    name:updatedUser.fullname,
    image:updatedUser.profilePicture
   })

   res.status(200).json(
    {
      message:'Onbaording completed successfully',
      success:false,
      user:updatedUser
    }
   )

})

export  const resendOtp = AsyncHandler(async(req,res)=>{

  //check if user data available in redis or not
  
  const {email} = req.body;

  const data = await redisClient.get(`signup:${email}`);

  if(!data){
    throw new AppError('user data not found. Failed to resedd otp',400);
  }

  let signupData;

  if(data){
    signupData = JSON.parse(data);
  }

  if(!signupData){
    throw new AppError("Signup session expired",400);
  }

  //generate otp 

  const otp = otpGenerator.generate(6,{lowerCaseAlphabets:true,upperCaseAlphabets:false,specialChars:false});

  //hash otp 

  const hashedOtp = await bcrypt.hash(otp,10);

  //save opt in redis 

  await redisClient.set(`otp:${email}`,hashedOtp,{
    EX:300 // opt expire in 5 minutes
  });

  await sendOtpVerificationEmail(email,otp);

  res.status(200).json({
    message:'OTP resent successfully',
    success:true
  })



})

export const  getUserLocation = AsyncHandler(async(req,res)=>{

  const {lat,lon} = req.body;

  if(!lat || !lon){
    throw new AppError("Please provide latitude and longitude",400);
  }

  const {data} = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);

  const location = {
          village:data.address.village || "",
          district : data.address.county || "",
          state: data.address.state || "",
          country: data.address.country || "",
          postCode: data.address.postcode || ""
  }

  res.status(200).json({
    message:'Location fetch successfully',
    success:true,
    location
  })


})