import { Schema,Types,model, type InferSchemaType, type ObjectId } from "mongoose";
import type { Type } from "typescript";

interface friendRequest{
    sender:Types.ObjectId,
    receiver:Types.ObjectId,
    status:"pending"|"accepted"
}

const friendRequestSchema = new Schema<friendRequest>({

    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    status:{
        type:String,
        enum:["pending","accepted"],
        default:'pending'
    }

},{timestamps:true})

export type friendRequestType = InferSchemaType<typeof friendRequestSchema>;

const friendRequestModel = model("friendRequest",friendRequestSchema);

export default friendRequestModel;