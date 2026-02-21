import { Link, useLocation } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser"
import { BellRingIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {

    const {user} = useAuthUser();

    const location = useLocation();

    const currentPath = location.pathname;

    console.log(currentPath);

  return (
   <aside className="h-screen bg-base-300 w-60 hidden lg:flex flex-col border-r border-r-base-300 sticky inset-0">

    {/* header  */}

    <div className="p-5 border-b border-base-300 ">
        <Link to={'/'} className="flex items-center gap-3" prefetch="viewport">
          
          <ShipWheelIcon className="size-9 text-primary hover:animate-spin"/>

          <span  className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary tracking-wider">
            Streamify
          </span>
        
        </Link>

    </div>

    <nav className=" mt-2 flex-col p-4 space-y-3">

        <Link to={'/'} 
        className={`btn w-full btn-ghost  justify-start normal-case  gap-2.5 px-3 
         ${currentPath==='/' ? "btn-active btn-neutral":""}    
        `}
        >
            <HomeIcon className="size-5 text-base-content opacity-70"/>
            <span>Home</span>
        
        </Link>

        <Link to={'/friends'} 
        className={`btn w-full btn-ghost  justify-start normal-case  gap-2.5 px-3 
         ${currentPath==='/friends' ? "btn-active btn-neutral":""}    
        `}
        >
            <UsersIcon className="size-5 text-base-content opacity-70"/>
            <span>Friends</span>
        
        </Link>

        <Link to={'/notifications'} 
        className={`btn w-full btn-ghost  justify-start normal-case  gap-2.5 px-3 
         ${currentPath==='/notifications' ? "btn-active btn-neutral":""}    
        `}
        >
            <BellRingIcon className="size-5 text-base-content opacity-70"/>
            <span>Notifications</span>
        
        </Link>


    </nav>

    {/* user profile section  */}

    <div className=" cursor-pointer p-4 border-t border-t-base-300 mt-auto">

        <div className="flex items-center gap-2">

            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={user?.profilePicture} alt="User avatar"/>
                </div>
            </div>

            <div className="flex-1">
                <p className="text-sm font-semibold">{user?.fullname}</p>

                <p className="mt-0.5 text-xs text-success flex items-center gap-1">
                    <span className="rounded-full animate-pulse size-2 bg-success inline-block"/>
                    <span className="text-inherit">Online</span>

                </p>

            </div>

        </div>

    </div>

   </aside>
  )
}

export default Sidebar
