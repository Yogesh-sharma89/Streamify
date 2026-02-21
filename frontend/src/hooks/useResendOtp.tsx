import { useMutation } from "@tanstack/react-query";
import { resendOtp } from "../lib/api";
import toast from "react-hot-toast";

export const useResendOtp = ()=>{
    const {mutate:resendMutation,isPending:resendPending} = useMutation({
    mutationFn:resendOtp,

    onSuccess:(data)=>{
      console.log(data);
      toast.success("OTP resent successfully");
    },
    onError:(err)=>{
      console.log('Error : ',err);
      toast.error(err.message || "Failed to resend OTP")
    }
  })

  return {resendMutation,resendPending};
}