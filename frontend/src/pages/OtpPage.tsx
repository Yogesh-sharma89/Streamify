import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useResendOtp } from "../hooks/useResendOtp";
import { useThemeStore } from "../store/useThemeStore";

const OtpPage = () => {
  const [otp,setOtp] = useState("");

  const location  = useLocation();

  const email = location.state?.signupData.email;

  const handleChange = (value:string)=>{
    
    const formattedOtp = value.replace(/[^A-Za-z0-9]/g, "");

    setOtp(formattedOtp);
  }

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {mutate,isPending:verificationPending } = useMutation({
    mutationFn: async()=>{
    
          const response = await axiosInstance.post("/auth/signup",{otp,email});
    
          return response.data;
    },
    onSuccess:(data)=>{
      console.log(data);
      toast.success("Email verified successfully");
      
      queryClient.invalidateQueries({queryKey:['user']});

      navigate('/onboarding');
    },
    onError:(err)=>{
      console.log("Error",err);
      toast.error(err.message ||"failed to verify email")
    }
  })

  const handleVerification = async()=>{
      
   mutate();

  }

  const {resendMutation,resendPending} = useResendOtp();

  const handleResend = ()=>{
    resendMutation(email);

  }

  const theme = useThemeStore((state)=>state.theme);

  return (
    <div data-theme={theme} className="h-screen w-full flex items-center justify-center">

       <div className="border rounded-xl border-primary max-w-3xl mx-auto w-full p-4 sm:p-6 lg:p-8">

        

         <div className="space-y-6">

           {/* heading  */}

           <div className="w-full flex flex-col items-center gap-2">

            <h1 className="text-xl lg:text-2xl font-bold">Email Verification</h1>
            <p className="text-sm text-white/70 font-semibold">We have sent a 6-digit code to your Email. Enter it below to continue</p>

           </div>

           <p className="text-xs font-medium text-center text-neutral-400">6-digit code</p>

           <div className="w-full flex justify-center">

            <OTPInput
             value={otp}
             onChange={handleChange}
             numInputs={6}
             inputType="text"
             shouldAutoFocus
             renderSeparator={<span style={{width:"15px"}}></span>}
             renderInput={(props)=>(
              <input
              {...props}
              style={{
                width:"43px",
                height:'43px',
                borderRadius:"8px",
                border:"2px solid #ddd",
                fontSize:"20px",
                textAlign:"center",
                margin:"5px"
              }}
              />
             )}
            />

           </div>

           <div className="w-[50%] mt-2 mx-auto items-center flex flex-col gap-3">

            <button onClick={handleVerification} disabled={verificationPending || !otp} className="disabled:cursor-no-drop btn btn-primary  font-medium rounded-xl text-lg w-full text-white/80">
              {
                verificationPending ? 
                <div className="inline-flex items-center gap-2">
                  <Loader2Icon className="size-6 animate-spin"/>
                  <span>Verifying...</span>

                </div>
                :
                <span>Verify</span>
              }
            </button>

            <button onClick={handleResend} disabled={verificationPending || resendPending} className="btn btn-ghost font-medium rounded-xl disabled:cursor-no-drop  w-full">
              {
                resendPending ? 
                <div className="inline-flex items-center gap-2">
                  <span className="loading loading-ring loading-md"></span>
                  <span>Sending...</span>

                </div>
                :
                <span>Resend</span>
              }
            </button>

            <Link to={'/signup'} className="btn btn-dash font-medium w-full rounded-xl">
             Cancel
            </Link>

           </div>

         </div>

       </div>
    
    </div>
  )
}

export default OtpPage
