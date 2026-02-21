import { useEffect, useState } from "react";
import {  useParams } from "react-router"
import { useAuthUser } from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
Channel,ChannelHeader,Chat,MessageInput,MessageList,
Thread,Window
}
from 'stream-chat-react'
import {  StreamChat,Channel as typeChannel } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import VideoCallButton from "../components/VideoCallButton";

const ChatPage = () => {

  const {id:targatedUserId} = useParams<{id:string}>();

  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const [chatClient,setChatClient] = useState<StreamChat| null>(null);
  const [channel,setChannel] = useState<typeChannel | null>(null);
  const [loading,setLoading] = useState(true);

  const { user} = useAuthUser();

  const {data} = useQuery({
        queryKey:['stream-token'],
        queryFn:getStreamToken,
        enabled:!!user
  })


  useEffect(()=>{

    const intializeChat = async()=>{
      if(!data?.token || !user) return ;

      console.log('Initializing stream chat client...')
      try{
        const streamClient =  StreamChat.getInstance(STREAM_API_KEY);

        await streamClient.connectUser({
          id:user._id,
          name:user.fullname ,
          image:user.profilePicture
        },data.token)

        const channelId = [user._id,targatedUserId].sort().join("-");

        const currentChannel = streamClient.channel("messaging",channelId,{
          members:[user._id , targatedUserId]
        })

        await currentChannel.watch();

        setChatClient(streamClient);
        setChannel(currentChannel);


      }catch(err){
          console.log("Error in connecting with stream chat : ",err);
          toast.error("Couldn't connect to chat. Please try again")
      }finally{
        setLoading(false);
      }
    }

    intializeChat();
  },[STREAM_API_KEY,user,targatedUserId,data?.token])

  if(!targatedUserId){
    return(
      <div>
        Invalid chat page
      </div>
    )
  }

  if(loading || !chatClient || !channel){
    return <ChatLoader/>
  }

  const handleVideoCall  = ()=>{

    if(channel){
      const url = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text:`I h've started a video call . Join me here : ${url}`
      })

      toast.success("Video call link sent")
    }

  }


  return (
    <div className="h-[89vh]">

      <Chat client={chatClient} theme="str-chat__theme-dark">
        <Channel channel={channel}>

          <div className="w-full relative">
            <VideoCallButton handleVideoCall = {handleVideoCall}/>
            <Window>
              <ChannelHeader/>
              <MessageList
              />
              <MessageInput focus={true} audioRecordingEnabled/>
             </Window>
            
          </div>
           <Thread/>

        </Channel>

      </Chat>
     
     </div>
  )
}

export default ChatPage
