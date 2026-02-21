import {
  BellIcon,
  Clock10Icon,
  Loader2Icon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import {
  useAcceptFriendRequest,
  useGetAllFriendRequests,
} from "../hooks/friends";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {

  const { friendRequestData, friendRequestLoading } = useGetAllFriendRequests();

  const { acceptFriendRequestMutation, acceptFriendRequestPending } =
    useAcceptFriendRequest();

  const incomingRequests = friendRequestData?.incomingReq ?? [];

  const acceptedRequests = friendRequestData?.acceptedReq ?? [];

  console.log(incomingRequests,acceptedRequests);

  return (
    <div className="p-4 sm:p-5 lg:p-7">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* heading  */}

        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Notifications
        </h1>

        {friendRequestLoading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-lg loading-dots" />
          </div>
        ) :
        <>
       
        
          
        { incomingRequests.length>0 && <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <UserCheckIcon className="size-5 text-primary" />
                  <span className="text-lg font-semibold">Friend Requests</span>
                </div>
                <span className="badge badge-primary">
                  {incomingRequests.length}
                </span>
              </div>

              <div className="space-y-3.5">
                {incomingRequests.map((req) => (
                  <div
                    key={req._id}
                    className="card bg-base-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="card-body p-4 ">
                      <div className="flex items-center justify-between">
                        {/* left  */}
                        <div className="flex items-center gap-2">
                          <div className="avatar size-12 rounded-full">
                            <img
                              src={req.sender.profilePicture}
                              alt="user avatar"
                              className="rounded-full"
                            />
                          </div>

                          <div>
                            <h3 className=" font-semibold mb-1.5">
                              {req.sender.fullname}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="badge badge-primary">
                                Native : {req.sender.nativeLanguage}{" "}
                              </span>
                              <span className="badge badge-outline">
                                Learning : {req.sender.learningLanguage}{" "}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* right  */}

                        <button
                          className={`btn btn-primary ${acceptFriendRequestPending && "btn-disabled"}`}
                          disabled={acceptFriendRequestPending}
                          onClick={() => acceptFriendRequestMutation(req._id)}
                        >
                          {acceptFriendRequestPending ? (
                            <div className="flex items-center gap-1.5">
                              <Loader2Icon className="size-4 animate-spin" />
                              <span>Accepting...</span>
                            </div>
                          ) : (
                            <span>Accept</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        </div>}

        
          
        {acceptedRequests.length > 0 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="size-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3.5">
                  {acceptedRequests.map((req) => (
                    <div className="card bg-base-200  shadow-sm" key={req._id}>
                      <div className="card-body p-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar size-14 rounded-full">
                            <img
                              src={req.receiver.profilePicture}
                              alt="user avatar"
                              className="rounded-full"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {req.receiver.fullname}
                            </h3>
                            <p className="text-sm py-1 oapcity-80">
                              {req.receiver.fullname} accepted your friend
                              request
                            </p>
                            <p className="text-xs flex items-center oapcity-70">
                              <Clock10Icon className="size-3 mr-1" />
                              Recently
                            </p>
                          </div>

                          <div className="badge badge-success">
                            <MessageSquareIcon className="size-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

        {
          incomingRequests.length === 0 && acceptedRequests.length===0 &&
          <NoNotificationsFound/>
        }
        </>

        }
      </div>
    </div>
  );
};

export default NotificationsPage;
