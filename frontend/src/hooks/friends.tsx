import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendRequest, getAllFriendRequests, getAllFriends, getOutgoingFriendRequest, getRecommendedUsers, sendFriendRequest } from "../lib/api";
import toast from "react-hot-toast";

export interface Friend {
  _id: string;
  fullname: string;
  profilePicture: string;
  nativeLanguage: string;
  learningLanguage: string;
  location: string;
  nativeCountryCode:string,
  learningCountryCode:string
}

export interface GetFriendsResponse {
  message: string;
  success: boolean;
  friends: Friend[];
}



export const useGetMyFriends = ()=>{

    const {data,error,isLoading} = useQuery<GetFriendsResponse>({
        queryFn:getAllFriends,
        queryKey:['friends'],
    })

    return {
        friendsData:data,friendsLoading:isLoading,friendsError:error
    }
}

export const useGetRecommendedUsers = ()=>{
    const {data,isLoading,error} = useQuery({
        queryKey:['recommendedUsers'],
        queryFn:getRecommendedUsers
    })

    return {
        recommendedUsersdata:data,recommendedUserLoading:isLoading,recommendedUserError:error
    }
}

export const useGetOutgoingFriendRequest = ()=>{
    const {data,isLoading,error} = useQuery({
        queryKey:['outgoingRequest'],
        queryFn:getOutgoingFriendRequest
    })

    return {
        outgoingFriendRequestData : data , outgoingRequestLoading : isLoading , outgoingRequestError:error
    }
}

export const useSendFriendRequest = ()=>{

   const queryClient = useQueryClient();

    const {mutate,isPending,error} = useMutation({
        mutationKey:['sendFriendRequest'],
        mutationFn:sendFriendRequest,
        onSuccess:(data)=>{
            console.log(data);
            toast.success("Friend request sent")
            queryClient.invalidateQueries({queryKey:['outgoingRequest']})
        },
        onError:(err)=>{
            console.log('Error : ',err.message);
            toast.error(err.message || 'Friend request failed')
        }
    })

    return {
        sendFriendRequestMutation:mutate, sendFriendRequestPending:isPending , sendFriendRequestError:error
    }
}

export const useGetAllFriendRequests = ()=>{
  const {data,isLoading,error} =   useQuery({
    queryKey:['friendRequest'],
    queryFn:getAllFriendRequests
 })

 return{
    friendRequestData:data, friendRequestLoading:isLoading,error
 }
}

export const useAcceptFriendRequest = ()=>{
    const queryClient = useQueryClient();

    const {mutate,isPending,error} = useMutation({
        mutationKey:['acceptRequest'],
        mutationFn:acceptFriendRequest,
        onSuccess:(data)=>{
            console.log(data);
            toast.success("Friend Request Accepted");
            queryClient.invalidateQueries({queryKey:['friendRequest']})
            queryClient.invalidateQueries({queryKey:['friends']})
        },
        onError:(err)=>{
            console.log("Error : ",err);
            toast.error(err.message || "Something went wrong. Please try later")
        }
    })

    return {
        acceptFriendRequestMutation:mutate , acceptFriendRequestPending:isPending,acceptFriendRequestError:error
    }
}