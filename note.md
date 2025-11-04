# 1. Install express - npm install express
# 2. Install nodemon - npm install nodemon -D
# 3. Install dotenv - npm install dotenv 
# 4. Install cors - npm install cors
# 5. Install cookie-parser - npm install cookie-parser
# 6. Install Mongoose - npm install mongoose
# 7. Jweb token and bcrypt - npm install jsonwebtoken bcryptjs


# Project setup
# folder structure
# Model

# Signup Model (Name, Email, Password, Confirm Password, Tracks)
Steps: 
1. Connect to Mongodb
2. 



<!-- import express from 'express';
import { ConnectDb } from './database/mongodb.js';

const app = express();
const PORT = 3000;




app.listen(PORT, ()=>{
ConnectDb();
  console.log(`Server is running on port ${PORT}`)
}) -->


<!-- import mongoose from "mongoose";

//The async function to connect to the database
export const ConnectDb = async () =>{

    try {

        await mongoose.connect('mongodb+srv://backendproject25:backend_25@clurd.hay9d2w.mongodb.net/')
        console.log("Mongodb connected successfully");
    } catch(error){
        console.log("Error in Mongodb connection", error);
    }
} -->


 mongodb+srv://equeeny17:Royalty123@project1.8fyazux.mongodb.net/


mongodb+srv://equeeny17_db_user:Royalty123@project1.8fyazux.mongodb.net/?appName=Project1

<!-- const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User; -->



qbc-gqcz-jzn




 [/\S+@\S+\.\S+/, "Email is invalid"]


