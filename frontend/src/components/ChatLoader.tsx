import { LoaderIcon } from "lucide-react"


const ChatLoader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
        <LoaderIcon className="size-10 text-primary animate-spin"/>
        <p className="text-lg font-mono text-center mt-4 font-medium">
            Connecting to chat...
        </p>
      
    </div>
  )
}

export default ChatLoader
