import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router"


const SignupOtpGuard = ({children}:{children:ReactNode}) => {
    const location = useLocation();

    const email = location.state?.signupData.email ;

    if(!email){
        return <Navigate to={'/signup'} replace />
    }

    return children
}

export default SignupOtpGuard
