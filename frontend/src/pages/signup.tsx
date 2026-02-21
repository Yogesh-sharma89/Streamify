import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, ShipWheelIcon } from "lucide-react";
import { useState } from "react"
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { sendOtp } from "../lib/api";
import { useThemeStore } from "../store/useThemeStore";

const SignupPage = () => {

  const [signupData,setSignupData] = useState({
    fullname:'',
    email:'',
    password:'',
    agree:false
  })

  const theme = useThemeStore((state)=>state.theme);

  const navigate = useNavigate();

  const {mutate,isPending,error} = useMutation({
    mutationFn:sendOtp,
    onSuccess:(data)=>{
      console.log(data);

      toast.success("OTP sent succesfully")
      
      navigate('/verify-otp',{
        state:{signupData}
      })

    },
    onError:(err)=>{
      console.log("Error : ",err);
      toast.error(err.message || "Failed to create account");
    }
  })

  const handleSignup = (e:React.SubmitEvent<HTMLFormElement>)=>{

    e.preventDefault();
    mutate(signupData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full p-4 sm:p-6 md:p-8" data-theme={theme}>


      <div
       className="border border-primary/25 flex flex-col lg:flex-row overflow-hidden shadow-lg rounded-xl max-w-6xl w-full mx-auto bg-base-100"
      >

        {/* left section  */}
        
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-8">

        {/* logo  */}

        <div className="flex items-center gap-2.5 justify-start mb-4 cursor-pointer">
          <ShipWheelIcon className="size-9 text-primary animate-none hover:animate-spin"/>
          <span className="text-3xl font-mono font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary/80 tracking-wider">Streamify</span>

        </div>

        {
          error && 
          <div className="mb-4 alert alert-error">
            <span>{error.message}</span>
          </div>
        }

        {/* sign up form  */}

        <div className="w-full">

          <form onSubmit={(e)=>handleSignup(e)}>

            <div className="space-y-5">

              {/* header  */}

              <div>
                <h2 className="text-xl font-semibold">Create an Account</h2>
                <p className="text-sm opacity-70">Join Streamify and start your langugae learning today</p>
              </div>

              {/* inputs field  */}

              <div className="space-y-3.5">

                <div className="w-full form-control flex flex-col gap-2">
                  <label className="label" htmlFor="name">
                    <span className="text-sm text-white/70">Full Name</span>
                  </label>
                  <input 
                    placeholder="John doe"
                    className="input input-wh w-full"
                    value={signupData.fullname}
                    onChange={(e)=>setSignupData({...signupData,fullname:e.target.value})}
                  />

                </div>

                <div className="w-full form-control flex flex-col gap-2">
                  <label className="label" htmlFor="name">
                    <span className="text-sm text-white/70">Email</span>
                  </label>
                  <input 
                   type="email"
                   required
                    placeholder="Johndoe@gmail.com"
                    className="input input-wh w-full"
                    value={signupData.email}
                    onChange={(e)=>setSignupData({...signupData,email:e.target.value})}
                  />

                </div>

                <div className="w-full form-control">
                  <div className="flex flex-col gap-2 w-full">
                      <label className="label" htmlFor="name">
                        <span className="text-sm text-white/70">Password</span>
                      </label>
                      <input 
                        required
                        minLength={6}
                        maxLength={8}
                        type="password"
                        placeholder="******"
                        className="input input-wh w-full"
                        value={signupData.password}
                        onChange={(e)=>setSignupData({...signupData,password:e.target.value})}
                      />
                  </div>

                  <p className="pl-2 mt-1 text-xs text-neutral-400 font-semibold">Password must be at least 6 characters long</p>
                </div>

                <div className="w-full form-control pl-2 pt-2">

                  <label className="cursor-pointer  label justify-start gap-2 flex items-center">

                    <input type="checkbox" required checked={signupData.agree} onChange={(e)=>setSignupData({...signupData,agree:e.target.checked})}  className="checkbox checkbox-success checkbox-sm"/>

                    <span className="text-xs font-medium tracking-tight text-white/80">

                      I agree to {"  "}
                      <span className="text-primary hover:underline">terms of service </span>
                     {"  "} and {"  "}

                      <span className="text-primary hover:underline">privacy policy</span>

                    </span>

                  </label>



                </div>


              </div>


              {/* submit button  */}

              <button type="submit"
              className={`btn btn-block w-full btn-primary disabled:cursor-not-allowed`} disabled={isPending}>
               {
                isPending ? <div className="inline-flex items-center gap-2">
                  <Loader2Icon className="size-5 animate-spin"/>
                  <span>Creating...</span>

                </div>:
                <span>Create account</span>
               }
              </button>

              <div className="w-full text-center mt-1">
               <p className="text-sm">
                Already have an account? {"  "}
                <Link to={'/login'} className="text-primary hover:underline">
                 Login
                </Link>
               </p>
              </div>

            </div>

          </form>

        </div>

        </div>


        {/* right section  */}

        <div className="hidden lg:flex items-center justify-center lg:w-1/2 bg-primary/10 w-full">
         
        

          <div className="max-w-md p-6">

            {/* image  */}

            <div className="max-w-sm mx-auto aspect-square relative">
              <img src="/signup.png" alt="language Illustration" className="size-full"/>
            </div>

            <div className="text-center space-y-5 mt-5">

              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="text-sm text-white/70">Practice conversations , make friends  and improve your lnaguage skills together</p>

            </div>

          </div>

        </div>

      </div>
     
    </div>
  )
}

export default SignupPage
