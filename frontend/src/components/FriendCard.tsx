import { Globe2Icon } from "lucide-react";
import type { Friend } from "../hooks/friends"
import { Link } from "react-router";
import { getLanguageFlag } from "../lib/getLanguageFlag";


const FriendCard = ({friend}:{friend:Friend}) => {
  return (
    <div className="card bg-base-200 transition-shadow hover:shadow-md">

        <div className="card-body p-4">

            <div className=" space-y-4">

               {/* user info  */}

                <div className="flex items-center gap-3 justify-start">
                  <div className="avatar size-12">
                    <img src={friend.profilePicture} alt={friend.fullname} className="rounded-full"/>
                  </div>
                  <h3 className="font-semibold truncate">{friend.fullname}</h3>
                </div>

                {/* languages  */}

                <div className="flex flex-wrap items-center gap-2">

                    <span className="badge badge-secondary text-xs">
                      {friend.nativeCountryCode ? 
                        getLanguageFlag(friend.nativeCountryCode)
                        :
                        <Globe2Icon className="size-4 text-base-content opacity-90"/>
                       
                      }
                      Native : {friend.nativeLanguage}
                    </span>

                    <span className="badge badge-outline text-xs">
                     {friend.learningCountryCode ? 
                        getLanguageFlag(friend.learningCountryCode)
                        :
                        <Globe2Icon className="size-4 text-base-content opacity-90"/>
                       
                      }
                      Learning : {friend.learningLanguage}
                    </span>

                </div>

                {/* message  */}

                <Link to={`chat/${friend._id}`} className="btn btn-outline w-full">
                  <span>Message</span>
                
                </Link>

             </div>

        </div>
      
    </div>
  )
}



export default FriendCard
