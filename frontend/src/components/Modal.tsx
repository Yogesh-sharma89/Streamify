import { BellIcon, HomeIcon, UsersIcon, X } from "lucide-react"
import { Link } from "react-router"



const Modal = ({close}:{close:()=>void}) => {
  return (
    <div className="fixed hidden z-50  inset-0 bg-black/30 backdrop-blur-sm w-full h-screen max-sm:flex items-center justify-center">
  
      <div className="bg-zinc-800 max-w-md w-full z-100  rounded-md p-4 relative">
        <div className="flex justify-end w-full">
            <button className="btn btn-ghost btn-circle" onClick={close}>
            <X className="size-6 text-base-content oapcity-70 hover:opacity-95" />
        </button>

        </div>

        

        <div className="w-[70%] space-y-4">

            <Link to={'/'} className="btn btn-ghost hover:btn-neutral justify-start flex items-center gap-3">
                <HomeIcon className="size-6 text-base-content opacity-80"/>
                <span>Home</span>
            </Link>

            <Link to={'/friends'} className="btn btn-ghost hover:btn-neutral justify-start flex items-center gap-3">
                <UsersIcon className="size-6 text-base-content opacity-80"/>
                <span>Friends</span>
            </Link>

            <Link to={'/notifications'} className="btn btn-ghost hover:btn-neutral justify-start flex items-center gap-3">
                <BellIcon className="size-6 text-base-content opacity-80"/>
                <span>Notifications</span>
            </Link>

        </div>
        
      </div>
         
    </div>
  )
}

export default Modal
