import mongoose from "mongoose";
import Auth from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const SignUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();


    try {
        const { name, email, password, track } = req.body;

        // check if any of the data is missing

        if (!name || !email || !password || !track) {
            return res.status(400).json({ message: "All fields are required" })
        }


        const existingUser = await Auth.findOne({ email }).session(session);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });

        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = await Auth.create([{ name, email, password: hashpassword, track }], { session })
        const token = jwt.sign({ userId: newUser[0]._id, email: newUser[0] }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        await session.commitTransaction();

        return res.status(201).json({
            message: "User created successfully",
        });

    } catch (error) {
        // await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}





export const SignIn = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const User = await Auth.findOne({ email });
        if (!User) {
            return res.status(400).json({ message: "User not found" })

        }

        const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password" })
        }


        const token = jwt.sign({ user: User.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        res.status(200).json({
            success: true,
            message: "Signin successful",
            token: token,
            data: {
                id: User.id,
                name: User.name,
                email: User.email,
                track: User.track
            },
        })
    } catch (error) {
        {
            next(error)
        }
    }

}




















//     try {
//         const {email} = req.body;
//         const adminExists = await Admin.findOne({email});
//         if(adminExists){
//             res.status(400).json({message: "Admin already exists, go to login page!"});
//         }
//         // const {name || email || track || role} = req.body;
//         const newAdmin = new Admin.create(req.body);
//         if(newAdmin){
//             res.status(201).json({
//                 message: "Admin created successfully",
//                 newAdmin: {
//                     id: newAdmin.id,
//                     name: newAdmin.name,
//                     email: newAdmin.email,
//                     track: newAdmin.track,
//                 }
//             });
//         }

//     } catch (error) {
//         return await res.status(500).json({message: "Server Error", error: error.message});
//     }
// }