import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useLogout = ()=>{

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {mutate,isPending,error} = useMutation({
      mutationFn:logout,

      onSuccess:(data)=>{
        console.log(data);

        toast.success('Logout succesfully');

        queryClient.removeQueries({queryKey:['user']})

        navigate('/login',{replace:true});
        
      },
      onError:(err)=>{
        console.log("Error : ",err);
        toast.error(err.message || "Logout failed")
      }
    })

   return {isPending,error,logoutMutation:mutate};
}