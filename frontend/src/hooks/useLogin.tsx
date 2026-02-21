import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";



export const useLogin = ()=>{

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {mutate,isPending,error} = useMutation({
    mutationFn:login,
    onSuccess:(data)=>{
      console.log(data);
      toast.success("Sign in succesfully")
      queryClient.invalidateQueries({queryKey:['user']})
      navigate('/')

    },
    onError:(err)=>{
      console.log("Error : ",err);
      toast.error("Sign in failed")
    }
  })

  return {isPending,error,loginMutation:mutate};
}