import { Inngest } from "inngest";
import User from "../models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "  Ping-Up" });

// ingest fuctn to save user data to a database

const syncUserUserCreation =ingest.createFunction(
  {id:'sync-user-from-clerk'},
  {event:'clerk/user.created'},
  async({event})=>{
    const {id,first_name,last_name,email_adresses,image_url}=event.data
    let username=email_addresses[0].email_address.split('@')[0]

    //check availbility of username
    const user=await User.findOne({username})

    if(user){
      username=username+Math.floor(Math.random()*10000)
    }
    const userData={

      _id:id,
      email:email_addresses[0].email_address,
      full_name:first_name+" " +last_name,
      profile_picture:image_url,
      username
    }
    //storing these data in mongo db database
    await User.create(userData)
  }
 

)

 //ingest function to update user data in database

 const syncUserUserUpdation =ingest.createFunction(
  {id:'update-user-from-clerk'},
  {event:'clerk/user.updated'},
  async({event})=>{
    const {id,first_name,last_name,email_adresses,image_url}=event.data
   

   const updatedUserData={
    email:email_addresses[0].email_address,
    full_name:first_name+' '+last_name,
    profile_picture:image_url
   }
   await User.findByIdAndUpdate(id,updatedUserData)

  }
 

)

 //ingest function to delete user data in database

 const syncUserUserDeletion =ingest.createFunction(
  {id:'delete-user-from-clerk'},
  {event:'clerk/user.deleted'},
  async({event})=>{
    const {id}=event.data
   

 
   await User.findByIdAndDelete(id)

  }
 

)



// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion
];