



































import mongoose from "mongoose";
import { MONGODB_URL } from "../config/env.js";

export const ConnectDb = async ()=>{

    try{
        await mongoose.connect(MONGODB_URL)
        console.log("Mongodb don join body")
    }catch(error){
        console.log("Mongodb no gree join body", error)
    }
}