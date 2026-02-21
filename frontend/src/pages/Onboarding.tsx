import { Navigate } from "react-router";
import Loader from "../components/loader";
import { useAuthUser } from "../hooks/useAuthUser"
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";
import toast from "react-hot-toast";
import {  GlobeIcon, LoaderCircleIcon, MapPinIcon, ShuffleIcon } from "lucide-react";
import { faker } from "@faker-js/faker";
import { axiosInstance } from "../lib/axios";
import { languageCountryList } from "../constant";

const OnboardingPage = () => {
  const {isLoading,user} = useAuthUser();

  const [formState,setFormState] = useState({

    fullname: user.fullname || "",
    bio:user.bio || "",
    nativeLanguage: user.nativeLanguage || "",
    learningLanguage : user.learningLanguage || "",
    location: user.location || "",
    profilePicture : user.profilePicture || "",
    nativeCountryCode : user.nativeCountryCode || "",
    learningCountryCode:user.learningCountryCode || ""

  })



  const queryClient = useQueryClient();

  const {mutate:onboardingMutation,isPending} = useMutation({

    mutationFn:completeOnboarding,
    onSuccess:(data)=>{
      console.log(data);
      toast.success("Profile Onboarded successfully");
      queryClient.invalidateQueries({queryKey:['user']})
    },

    onError:(err)=>{
      console.log("Error : ",err);
      toast.error(err.message || "Something went wrong . Please try again")
    }
  })

  useEffect(()=>{
    if(!navigator.geolocation){
      toast.error("Geolocation is not supported by your browser")
    }

    navigator.geolocation.getCurrentPosition(
      async(position)=>{

        const {longitude,latitude} = position.coords;

        const {data} = await axiosInstance.post('/auth/get-user-location',{lat:latitude,lon:longitude});
        console.log(data.location);

        const location = data.location;

        setFormState({...formState,location:location.village+", "+location.district +", "+location.state+" "+location.postCode+", "+location.country})

      },
      (err)=>{
        console.log("error in finding location : ",err);
        toast.error(err.message);

      },
      {
        enableHighAccuracy:true,
        timeout:10000,
      }
    )
  },[formState])

  if(isLoading){
    return <Loader/>
  }

  if(user?.isOnboarded){
    return <Navigate to={'/'} replace/>
  }

  const handleProfileOnbaording = (e:React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    onboardingMutation(formState);
  }

  const handleRandomAvtar = ()=>{
    const avatar = faker.image.avatar();
    setFormState({...formState,profilePicture:avatar});
    toast.success("Random avatar generated succesfully")

  }

  

  return (
    <div className="min-h-screen bg-base-100 w-full flex items-center justify-center p-4">

      <div className="bg-base-200 shadow-xl card max-w-4xl mx-auto w-full ">

        <div className="card-body p-4 sm:p-6 lg:p-8">

          <h1 className="text-xl mb-7 text-center lg:text-2xl font-bold text-white/70">Complete Your Profile</h1>

          <form onSubmit={handleProfileOnbaording} className="space-y-8">

            <div className="flex flex-col items-center justify-center w-full space-y-4">

              <div className="size-32 rounded-full bg-base-300 overflow-hidden">

                {
                  formState.profilePicture ? 
                  <img
                  src={formState.profilePicture}
                  alt="user profile picture"
                  className="size-full object-cover"
                  />
                  :
                  <div className="size-full skeleton">
                  </div>
                }

              </div>

              <div className="flex items-center">

                <button className="btn btn-accent inline-flex items-center gap-3" type="button" onClick={handleRandomAvtar}>
                  <ShuffleIcon className="size-4.5"/>
                  <span>Generate random avatar</span>

                </button>

              </div>

            </div>

            {/* full Name  */}

            <div>
              <label className="label text-white/60 mb-1.5">
                Full Name
              </label>

              <input
              required
              name="fullname"
              value={formState.fullname}
              onChange={(e)=>setFormState({...formState,fullname:e.target.value})}
              className="input input-md w-full"
              placeholder="Enter your full name"
              />

            </div>


             {/* BIO  */}
            <div className="w-full flex flex-col">
             <label className="label text-white/60 mb-1.5">
                Bio
              </label>

              <textarea
              required
               value={formState.bio}
               onChange={(e)=>setFormState({...formState,bio:e.target.value})}
               placeholder="Tell others about yourself and your lnaguage learning goals"
               className="textarea resize-none outline-none  selection:bg-green-700 w-full rounded-xl h-30 overflow-y-auto overflow-x-hidden"
              />
            </div>

            {/* languages  */}

            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 ">

              <div className="">
                <label className="label text-white/60 mb-1.5">
                  Native Language
                </label>

                <select 
                required
                onChange={
                  (e)=>{
                    const [language,countryCode] = e.target.value.split('-');

                    setFormState((prev)=>({
                      ...prev,
                      nativeLanguage:language,
                      nativeCountryCode:countryCode
                    }))


                  }
                }
                defaultValue={'Choose your native language'} className="select select-md w-full rounded-xl">
                  <option disabled={true}>Choose your native language</option>
                 {
                  languageCountryList.map((language)=>(
                    <option key={language.language} value={`${language.language}-${language.countryCode}`}>
                      {language.label}
                    </option>
                  ))
                 }

                </select>

              </div>

              <div className="">
                <label className="label text-white/60 mb-1.5">
                  Learning Language
                </label>

                <select 
                required
                onChange={
                  (e)=>{
                    const [language,countryCode] = e.target.value.split('-');

                    setFormState((prev)=>({
                      ...prev,
                      learningLanguage:language,
                      learningCountryCode:countryCode
                    }))


                  }
                }
                defaultValue={'Choose your learning language'} className="select w-full select-md rounded-xl">
                  <option disabled={true}>Choose your learning language</option>
                  
                  {
                  languageCountryList.map((language)=>(
                    <option key={language.language} value={`${language.language}-${language.countryCode}`}>
                      {language.label}
                    </option>
                  ))
                 }

                </select>

              </div>


            </div>

            {/* location */}

            <div>
               <label className="label text-white/60 mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPinIcon className="absolute z-10 left-3 size-5 top-1/2 transform -translate-y-1/2 opacity-60"/>

                <input
                required
                value={formState.location}
                onChange={(e)=>setFormState({...formState,location:e.target.value})}
                className="input relative pl-10 w-full"
                placeholder="City, Country or full address"
                />

              </div>
            </div>

            {/* submit button  */}

            <button type="submit" className="btn btn-primary w-full disabled:cursor-not-allowed" disabled={isPending}>
              {
                !isPending ? 
                <div className="inline-flex items-center gap-3">
                  <GlobeIcon className="size-5"/>
                  <span>Complete Onboarding</span>
                </div>
                :
                <div className="inline-flex items-center gap-3">
                  <LoaderCircleIcon className="size-5 animte-spin"/>
                  <span>Onboarding...</span>
                </div>
              }

            </button>

          </form>

        </div>

      </div>
     
    </div>
  )
}

export default OnboardingPage
