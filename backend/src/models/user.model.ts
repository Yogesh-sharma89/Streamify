import bcrypt from "bcryptjs";
import { Schema,model } from "mongoose";
import type {InferSchemaType, Types} from 'mongoose';

interface userSchemaType{

    fullname:string,
    email:string,
    password:string,
    agree:boolean,
    bio:string,
    nativeLanguage:string,
    nativeCountryCode:string,
    learningLanguage:string,
    learningCountryCode:string,
    location:string,
    profilePicture:string,
    isOnboarded:boolean,
    friends:Types.ObjectId[]
}

const userSchema = new Schema<userSchemaType>({

    fullname:{
        type:String,
        required:[true,'Full name is required to create user'],
        trim:true,

    },
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
        trim:true,
        index:true
    },
    password:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'Password is required'],
        minlength:[6,"Mininum length of password should be 6"]
    },
    agree:{
        type:Boolean,
        default:false,
        required:[true,'You have to agree our terms and privacy policy to continue'],
    },
    bio:{
        type:String,
        trim:true,
        default:'',
        maxlength:500,
    },
    profilePicture:{
        type:String,
        default:''
    },
    location:{
        type:String,
        default:'',
        trim:true,
    },
    nativeLanguage:{
        type:String,
        trim:true,
    },
    learningLanguage:{
        type:String,
        trim:true,
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    nativeCountryCode:{
        type:String,
    },
    learningCountryCode:{
        type:String,
    }

},{timestamps:true})

//before saving hash the password

userSchema.pre('save',async function(){
    if(!this.isModified){
        return;
    }

    const hashedPassword = await bcrypt.hash(this.password,10);

    this.password = hashedPassword;

    return;
})

export type userType = InferSchemaType<typeof userSchema>

const User = model<userType>('User',userSchema);

export default User;