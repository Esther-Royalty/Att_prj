import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: [4, "Name must not be less than 4 characters"],
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [10, "Email must not be less than 10 characters"],
        
        match: [/\S+@\S+\.\S+/, "Email is invalid"],

    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength: [8, "Password can't be less than 8 characters"],
        
       
    },
    track:{
        type: String,
        enum: [
            "Backend Development",
            "Fullstack Development",
            "Data Analytics",
            "Cloud Computing",
            "Cyber Security",
        ],
        required: [true, "Track cannot be empty"],

    },

},
     {timestamps: true}

);
const auth = mongoose.model("Auth", authSchema)
export default auth













































































// import mongoose from 'mongoose';


// const adminSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: [4, "name must be at least 4 characters"],
//         maxLength: [30, "name must be at least 30 characters"],
//     },
//     email: {
//         type: String,
//         required:[true, "Email is in use"],
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: [10,"Email must be at least 5 charaters"],
//         maxLength: [50, "Email must be at most 50 characters"],
//         match: [/\S+@\S+\.\S+/, "Email is invalid"],
//     },
//     tracks : {
//         type: String,
//         enum: [
//             "Data Analytics",
//             "Cloud Computing",
//             "Cyber Security",
//             "Backend Development",
//             "Fullstack Development",
//         ],
//         required: [true, "Track is required"],
//     },
//     password: {
//         type: String,
//         required: [true, "Password is required"],
//         minLength: [8, "Password must be at least 8 characters"],
//         maxLength: [30, "Password must be at least 30 characters"],
//     },
//     role: {
//         type: String,
//         enum: ['superadmin', 'admin'],
//         required: true,
//         default: 'admin'
//     }
// }, 

//         {timestamps: true}

// );

// //hashes password before saving.
// adminSchema.pre('save', async function(next){
//     //checks if the password has been modified
//     if(!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// const admin = mongoose.model("Admin", adminSchema)
// export default admin;



