import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:["USER","ADMIN","ARTIST"],
        default:"USER"
    }
},{timestamps:true})

export default mongoose.model("User",userSchema)