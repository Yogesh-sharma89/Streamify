import { VideoIcon } from "lucide-react"


const VideoCallButton = ({handleVideoCall}:{handleVideoCall:()=>void}) => {
  return (
    <div className="p-3 border-b border-base-100  flex items-center justify-end max-w-7xl w-full mx-auto  absolute top-0 ">
        <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
            <VideoIcon className="size-6"/>
        </button>
    </div>
  )
}

export default VideoCallButton
