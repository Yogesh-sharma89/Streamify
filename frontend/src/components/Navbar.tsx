import { Link, useLocation } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser"
import { useLogout } from "../hooks/useLogout";
import { BellIcon, LoaderIcon, LogOutIcon, MenuIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useEffect } from "react";


const Navbar = ({open,close}:{open:()=>void,close:(value:boolean)=>void}) => {
    const {user} = useAuthUser();

    const location = useLocation();

    const isChatPage = location.pathname?.startsWith('/chat');

    const {logoutMutation,isPending} = useLogout();

    const handleLogout = ()=>{
        logoutMutation();
    }

    useEffect(()=>{
      close(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])

  return (
    <nav  className=" bg-base-200 border-b border-b-base-200 flex items-center h-16 z-30 sticky top-0 ">

        <div className="container mx-auto p-4 sm:p-6 lg:p-8">

            <div className={`flex items-center  w-full 
                ${isChatPage ? "justify-between":"justify-end"}
                `}>

                {/* show logo if chat page  */}

                {
                    isChatPage &&
                    <div className="pl-2">
                         <Link to={'/'} className="flex items-center gap-3" prefetch="viewport">
          
                            <ShipWheelIcon className="size-9 text-primary hover:animate-spin"/>

                            <span  className="text-2xl lg:text-3xl font-bold font-mono text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary tracking-wider">
                                Streamify
                            </span>
                            
                        </Link>

                    </div>
                }


                <div className=" hidden sm:flex  items-center gap-3 sm:gap-4.5">

                    <Link to={'/notifications'}>
                        <button className="btn btn-ghost btn-circle">
                            <BellIcon className="size-5 text-base-content opacity-70"/>
                        </button>
                    </Link>

                    <ThemeSelector/>

                    <div className="avatar ring-1 p-0.5 rounded-full ring-green-400">
                        <div className="w-7 rounded-full">
                            <img src={user?.profilePicture} alt="User avatar"/>
                        </div>
                    </div>

                    <button onClick={handleLogout} className={`btn btn-ghost btn-circle ${isPending && "btn-disabled cursor-not-allowed"}`}>
                       {isPending ? 
                       <LoaderIcon className="size-5 text-base-content opacity-90 animate-spin"/>
                       :
                       <LogOutIcon className="size-5 text-base-content opacity-70"/>}
                    </button>

                </div>

                <div className="items-center gap-2 hidden max-sm:flex">
                     <div className="avatar ring-1 p-0.5 rounded-full ring-green-400">
                        <div className="w-7 rounded-full">
                            <img src={user?.profilePicture} alt="User avatar"/>
                        </div>
                    </div>

                    <button className=" btn btn-ghost btn-circle" onClick={open}>
                      <MenuIcon className="size-5 text-base-content opacity-75"/>
                    </button>

                </div>

                

            </div>

        </div>


     
    </nav>
  )
}

export default Navbar
