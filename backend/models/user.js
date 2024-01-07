import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
    },
    avatar:{
        type:String
    },
    isVerified:{
        type:Boolean
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User;