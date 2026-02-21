import { useState, type ReactNode } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Modal from "./Modal";


const Layout = ({children,showSidebar=false}:{children:ReactNode,showSidebar:boolean}) => {

    const [open,setOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden w-full">

        <div className="flex w-full h-full">

             {showSidebar && <Sidebar/>}

             <div className="flex-1  flex flex-col min-h-0">
                <Navbar open={()=>setOpen(true)} close={setOpen}/>
                {
                 open && <Modal close={()=>setOpen(false)}/>
                }
                <main className="flex-1  overflow-y-auto">
                    {children}
                </main>

             </div>


        </div>
      
    </div>
  )
}

export default Layout
