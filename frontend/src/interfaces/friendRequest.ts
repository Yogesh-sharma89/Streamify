export interface friendRequestSent{
    _id:string,
    sender:string,
    receiver:string,
    status:"pending"|"accepted"
}

export interface friendRequestSentResponse{
    message:string,
    success:boolean,
    request:friendRequestSent
}

export interface outgoingRequest{
  sender:string,
  status:"pending"|"accepted",
  receiver:{
    _id:string,
    fullname:string,
    profilePicture:string,
    nativeLanguage:string,
    learningLanguage:string
  }
}

export interface outgoingReqResponse{
    message:string,
    success:boolean,
    outgoingReq : outgoingRequest[]
}

export interface incomingReq{
  _id:string,
  receiver:string,
  status:"pending"|"accepted",
  sender:{
    _id:string,
    fullname:string,
    nativeLanguage:string,
    learningLanguage:string,
    profilePicture:string
  }
}

export interface acceptedReq{
  _id:string,
  sender:string,
  status:'pending'|'accepted',
  receiver:{
    _id:string,
    fullname:string,
    profilePicture:string
  }
}

export interface friendRequestsResponse{
  message:string,
  success:boolean,
  incomingReq:incomingReq[],
  acceptedReq:acceptedReq[]
}