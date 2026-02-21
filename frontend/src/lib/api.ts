
import type { friendRequestSentResponse, friendRequestsResponse, outgoingReqResponse } from "../interfaces/friendRequest";
import type { getTokenResponse } from "../interfaces/token";
import { axiosInstance } from "./axios";

export interface signupData{
    fullname: string;
    email: string;
    password: string;
    agree: boolean;
}

export interface loginData{
    email:string,
    password:string
}

export interface formState{
    fullname: string,
    bio: string,
    nativeLanguage: string,
    learningLanguage: string,
    location: string,
    profilePicture: string,
}

export interface getRecommendedUsers{
    message:string,
    success:boolean,
    users:User[]
}

export  interface User{
    _id:string,
    fullname:string,
    email:string,
    password:string,
    agree:boolean,
    bio:string,
    nativeLanguage:string,
    nativeCountryCode:string,
    learningLanguage:string,
    learningCountryCode:string,
    location:string,
    profilePicture:string,
    isOnboarded:boolean,
    friends:string[]
}

export const sendOtp = async(signupData:signupData)=>{

      const response = await axiosInstance.post("/auth/send-otp",signupData)
      return response.data;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = async(otp: any,email: any)=>{

      const response = await axiosInstance.post("/auth/signup",{otp,email});

      return response.data;
}

export const resendOtp = async(email:string)=>{
    const response = await axiosInstance.post('/auth/resend-otp',{email});

    return response.data;
}

export const login = async(loginData:loginData)=>{
      const response = await axiosInstance.post('/auth/login',loginData);

      return response.data;
}

export const getAuthUser = async()=>{
    const response = await axiosInstance.get("/auth/me");
    return response.data;
}

export const completeOnboarding = async(formState:formState)=>{
    const response = await axiosInstance.post("/auth/onboarding",formState)
    return response.data;
}

export const logout = async()=>{
      const response = await axiosInstance.post('/auth/logout');

      return response.data;
}

export const getAllFriends = async()=>{
    const response = await axiosInstance.get('/user/friends');
    return response.data;

}

export const getRecommendedUsers = async():Promise<getRecommendedUsers>=>{
    const response = await axiosInstance.get("/user");
    return response.data;
}

export const getOutgoingFriendRequest = async():Promise<outgoingReqResponse>=>{
    const response = await axiosInstance.get('/user/outgoing-friend-request');
    return response.data;
}

export const sendFriendRequest = async(id:string):Promise<friendRequestSentResponse>=>{
    const response = await axiosInstance.post(`user/friend-request/${id}`);
    return response.data;
}

export const getAllFriendRequests = async():Promise<friendRequestsResponse>=>{
    const response  = await axiosInstance.get('/user/friend-requests');

    return response.data;
}

export const acceptFriendRequest = async(requestId:string)=>{

    const response = await axiosInstance.post(`/user/friend-request/${requestId}/accept`);
    return response.data;

}

export const getStreamToken = async():Promise<getTokenResponse>=>{
    const {data} = await axiosInstance.get("/chat/token");
    return data;
}

