import { Link, Navigate } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser";
import {
  useGetMyFriends,
  useGetOutgoingFriendRequest,
  useGetRecommendedUsers,
  useSendFriendRequest,
} from "../hooks/friends";
import {  useMemo } from "react";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriendFound from "../components/NoFriendFound";
import NoLanguagePartnerFound from "../components/NoLanguagePartnerFound";
import { getLanguageFlag } from "../lib/getLanguageFlag";

const HomePage = () => {
  const { user } = useAuthUser();

  const { friendsData, friendsLoading } = useGetMyFriends();

  const friends = friendsData?.friends ?? [];

  const { recommendedUsersdata, recommendedUserLoading } =
    useGetRecommendedUsers();

  const recommendedUsers = recommendedUsersdata?.users ?? [];

  console.log(recommendedUsers);

  const { outgoingFriendRequestData } =
    useGetOutgoingFriendRequest();

  //for sending friend request who is not my friend

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const outGoingReq = outgoingFriendRequestData?.outgoingReq ?? [];

  const { sendFriendRequestMutation, sendFriendRequestPending } =
    useSendFriendRequest();

  const handleRequestSent = (id:string)=>{
    sendFriendRequestMutation(id);
  }

  const outgoingFriendRequestIds = useMemo(()=>{
    return new Set(
      outGoingReq?.map((req)=>req?.receiver?._id)
    )
  },[outGoingReq])

  

  if (!user?.isOnboarded) {
    return <Navigate to={"/onboarding"} />;
  }

  return (
    <div className="w-full min-h-svh h-full overflow-y-auto p-4 sm:p-5 lg:p-6">
      <div className="container mx-auto space-y-10">
        {/* header  */}

        <div className="flex w-full items-center justify-between">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold tracking-tight">
            Your Friends
          </h1>

          <Link to={"/notifications"} className="btn btn-outline btn-sm ">
            <UsersIcon className="size-5 mr-2" />
            <span className="font-medium ">Friend Requests</span>
          </Link>
        </div>

        {/* friends  */}

        {friendsLoading ? (
          <div className="flex justify-center py-10">
            <span className="loading-ball loading loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendFound />
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  @min-3xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* recommended user section  */}

        <section>
          <div className="mb-8">
            <h2 className="lg:text-3xl mb-0.5 md:text-2xl text-xl font-bold tracking-tight">
              Meet New Learners
            </h2>

            <p className="text-sm text-base-content opacity-70">
              Discover perfect langugae exchange partner based on your profile
            </p>
          </div>

          {recommendedUserLoading ? (
            <div className="flex justify-center py-10">
              <span className="loader loading-ball loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <NoLanguagePartnerFound />
          ) : (
            <div className=" mt-8 mb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  @min-3xl:grid-cols-4 gap-3">
              {recommendedUsers.map((user) => {
                const hasRequestSent = outgoingFriendRequestIds.has(user._id);
                return (
                  <div key={user._id} className="card w-fit bg-base-200 hover:shadow-lg transition-all duration-300">
                    <div className="card-body p-5 ">
                      {/* user info */}

                      <div className="flex items-center justify-start gap-4 mb-2">
                        {/* user avatar  */}

                        <div className="avatar size-14">
                          <img
                            className="rounded-full size-full"
                            src={user.profilePicture}
                            alt="user avatar"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="font-bold text-md">
                            {user.fullname}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <MapPinIcon className="size-4 text-zinc-400 oapcity-10" />
                            <span className="text-xs font-semibold truncate text-zinc-400 oapcity-60">
                              {user.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap justify-start gap-2.5 mb-2">
                        {/* native language  */}

                        <button className="badge badge-primary">
                          {getLanguageFlag(user.nativeCountryCode)}
                          Native : {user.nativeLanguage}
                        </button>

                        <button className="badge badge-outline">
                          {getLanguageFlag(user.learningCountryCode)}
                          Learning : {user.learningLanguage}
                        </button>
                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-70 mb-2">{user.bio}</p>
                      )}

                      {/* action button  */}

                      <button
                        className={`btn w-full 
                          ${hasRequestSent ? "btn-disabled" : "btn-primary"}    
                          `}
                        onClick={() => handleRequestSent(user._id)}
                        disabled={hasRequestSent || sendFriendRequestPending}
                      >
                        {hasRequestSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request sent
                          </>
                        ) : 
                        (
                          
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
