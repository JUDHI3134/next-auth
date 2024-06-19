import { error } from "console";
import mongoose from "mongoose";


export async function connect() {
    try {
       mongoose.connect(process.env.MONGO_URI!) 
       const connection = mongoose.connection

       connection.on("connected",()=>{
           console.log("mongoDb Connected");         
       })

       connection.on("erroe",()=>{
        console.log("mongoDB connection Error, please make sure db is up and running :"+error);
        process.exit()   
       })

    } catch (error) {
        console.log("Something went wrong connecting to DB");
        console.log(error);
        
    }
}