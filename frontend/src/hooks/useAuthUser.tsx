import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

export const useAuthUser = ()=>{
    const authUser = useQuery({
        queryKey:['user'],
        queryFn:getAuthUser,
        staleTime:1000*60*5,
        refetchOnWindowFocus:false,
        retry:false
    })

    return {isLoading:authUser.isLoading,user:authUser.data?.user}
}