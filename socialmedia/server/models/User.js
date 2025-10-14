// ab i want to store user ka data it can be done
//  in mongo db by creating models


import mongoose from 'mongoose';
const userSchema =new mongoose.Schema({
  _id : {type :String,required:true},
  email:{type:String,requied:true},
  full_name:{type:String,unique:true},
  username:{type:String,unique:true},
  bio:{type:String,default:'Hey there,I am using PingUp'},
  profile_picture:{type:String,default:''},
  cover_photo:{type:String,default:''},
  location:{type:String,default:''},
  followers:[{type:String,ref:'User'}],
  following:[{type:String,ref:'User'}],
  connections:[{type:String,ref:'User'}],



},{timestamps:true,minimize:false})
const User=mongoose.model('User',userSchema)


export default User;