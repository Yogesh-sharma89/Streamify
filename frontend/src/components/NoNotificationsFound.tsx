import { BellIcon } from "lucide-react"


const NoNotificationsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

        <div className="flex items-center justify-center  bg-base-200 size-18 mb-4">
            <BellIcon className="size-8 text-base-content opacity-50"/>
        </div>

        <h2 className="text-lg font-semibold mb-2">No Notifications yet</h2>
        <p className="text-base-content opacity-75 max-w-md">
            When you receive friend requests or messages , they'wll appear here.
        </p>

      
    </div>
  )
}

export default NoNotificationsFound
