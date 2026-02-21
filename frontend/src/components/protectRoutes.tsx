import type { ReactNode } from "react"
import { Navigate } from "react-router";
import Loader from "./loader";
import { useAuthUser } from "../hooks/useAuthUser";


const ProtectRoutes = ({children}:{children:ReactNode}) => {

  const {isLoading,user} = useAuthUser();

  if(isLoading){
    return(
      <Loader/>
    )
  }

  if(!user){
    return <Navigate to={'/login'} replace/>
  }


  return children;
}

export default ProtectRoutes;
