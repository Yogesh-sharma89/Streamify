import Loader from "./loader";
import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuthUser } from "../hooks/useAuthUser";


const PublicRoute = ({children}:{children:ReactNode}) => {

    const {isLoading,user} = useAuthUser();

    if(isLoading){
    return(
        <Loader/>
        )
    }
 
    if(user){
        return <Navigate to={'/'} replace/>
    }

    return children
}

export default PublicRoute
