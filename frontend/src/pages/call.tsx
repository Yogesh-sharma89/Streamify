import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router"
import { useAuthUser } from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import toast from "react-hot-toast";

import { 
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  type User,
  Call,

} from "@stream-io/video-react-sdk";

import '@stream-io/video-react-sdk/dist/css/styles.css';
import Loader from "../components/loader";


const CallPage = () => {
  const {id:callId} = useParams<{id:string}>();

  const [client,setClient] = useState<StreamVideoClient | null>(null);
  const [call,setCall] = useState<Call|null>(null);
  const [isConnecting,setIsConnecting] = useState(true)
  
  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;;

  const {user:currentUser} = useAuthUser();

  const {data} = useQuery({
        queryKey:['stream-token'],
        queryFn:getStreamToken,
        enabled:!!currentUser
  })

  useEffect(()=>{

    if(!data?.token || !currentUser || !callId) return;

    const initCall  = async()=>{

      console.log("Initializing stream video client")

      try{

        const user:User={
          id:currentUser._id , 
          name:currentUser.fullname,
          image:currentUser.profilePicture
        }

        const videoClient = new StreamVideoClient({apiKey:STREAM_API_KEY,user,token:data.token});
        const call   = videoClient.call('default',callId);
        await call.join({create:true})

        toast.success("Video call joined successfully");

        setClient(videoClient);
        setCall(call);

      }catch(err){
        console.log('Error in stream video client : ',err);
        toast.error("Failed to start video call")
      }finally{
        setIsConnecting(true);
      }

    }
    initCall();
  },[STREAM_API_KEY,data?.token,currentUser,callId])


  if(isConnecting ||  !call || !client){
    return <Loader/>
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">

      <div className="w-full relative">
        {
          client && call && 
          <StreamVideo client={client}>
            <StreamCall call={call}>

              <CallContent/>

            </StreamCall>

          </StreamVideo>
        }

      </div>
      
    </div>
  )
}

const CallContent = ()=>{
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if(callingState === CallingState.LEFT) {
    navigate('/',{replace:true});
    return;
  }

    return (
      <StreamTheme>
        <SpeakerLayout/>
        <CallControls/>
      </StreamTheme>
    )
}

export default CallPage
