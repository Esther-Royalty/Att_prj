import mongoose from "mongoose";
import Enroll from "../models/enroll.model.js";



// Helper function to prevent attendance marking on saturdays and sundays
const isWeekend = ()=>{
  const day = date.getDay()
  return day === 0 || day === 6
}
//Helper function to know the start of the day
const getStartOfDay = ()=>{
  const start = Date(date)
  start.setHours = (0,0,0,0)
  return start
}

//Helper function to know end of the day
const getEndOfDay = ()=>{
  const end = Date(date)
  end.setHours = (23,59,99,999)
  return end
}


//helper function to get working days range (mon - fri)
const getWorkingDays = (startDate, EndDate)=>{
  const workingDays =[];
  const current = new Date(startDate)
  while(current <= EndDate){
    if (!isWeekend(current)){
      workingDays.push(new Date(current))
    }
    current.setDate(current.getDate() + 1)
  }
  return workingDays;
}



export const EnrollUser = async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();
    try{

        const {firstname, lastname, email, phonenumber,  gender, learningtrack} = req.body;

        // validate that all required fields are provided
        if (!firstname || !lastname || !email || !phonenumber || !gender || !learningtrack)
           return res.status(400).json({message: "All field are required"}); 

        //check if the user already exist in the database
        const existingUser  = await Enroll.findOne({email}).session(session); 
    if (existingUser) {
      return res.status(400).json({ message: "Email, phone number, already exists" });
    }

    // Create new enrollment
    const newEnrollment = await Enroll.create([{
      firstname,
      lastname,
      email,
      phonenumber,
      gender,
      learningtrack,
    }], {session});

        await session.commitTransaction();
        session.endSession()

    return res.status(201).json({
      message: "Enrollment successful",
      
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession()
   next(error);
  }
};


export const markAttendance = async (req,res,next)=>{
  try {
    const {email}= req.body;

    if(!email){
      return res.status(400).json({message: "Email required!"})
    }

    //Validation - check if student enrolled
    const student = await Enroll.findOne({email});

    if(!student){
      return res.status(400).json({message: "Student not found!"})
    }

    const today = new Date()
    console.log("Today's Date: ", today)

    //check if today is weekend
    if(isWeekend(today)){
      return res.status(400).json({message: "Attendance cannot be marked on weekends!"})
    }


// prevent student from marking attendance twice in a day
//this means startOfDay is 00.00 midnight
//this means endOfDay is 11.59pm today
//so we are creating a time range that represents today only

    const startOfDay = getStartOfDay(today)
    const endOfDay = getEndOfDay(today)
    const alreadyMarked = student.attendance.some((record)=>{

      const recordDate = new Date(record.date);
      return recordDate >= startOfDay && recordDate <= endOfDay;

      
    })

    if (alreadyMarked){
      return res.status(400).json({Message: "Attendance already marked!"})
    }

    //Mark the student present
    student.attendance.push({
      date: today,
      status: "present"
    })

    //save it
    await student.save();

    return res.status(200).json({
      message: "Attendance marked successfully!",
    })

   
  }catch (error) {
    return res.status(500).json({
      message: "Something went wrong", 
      error: error.message
    })
  }
}

export const autoMarkabsence = async (req,res,next)=>{

}

export const getOverallAttendance = async (req,res,next)=>{

}

export const getAllStudentWithAttendance = async (req,res,next)=>{

}

export const getStudentAttendance = async (req,res,next)=>{
  
}


















































// const isWeekend = ()=>{
//   const day = date.getDay()
//   return day === 0 || day === 6
//   //Sunday is 0, saturday is 6
// }


// const getStartOfDay = (date)=>{
//   const start = new Date(date);
//   start.setHours(0,0,0,0);
//   return start 
// }


// function getEndOfDay(date){
//   const end = new Date(date);
//   end.setHours(23,59,99,999);
//   return end
// }