import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: {
        type:Date,
        // default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    }
},

{
    _id: false
})


const enrollSchema = new mongoose.Schema({
   firstname:{
          type: String,
          required:[true, "Please enter your first name"],
          trim: true, 
         
      },
        lastname:{
          type: String,
          required:[true, "Please enter your last name"],
          trim: true, 
         
      },
      email:{
          type: String,
          required:true,
          trim: true,
          lowercase:true,
          unique: true,
          match: [/\S+@\S+\.\S+/, "Email is invalid"],
      },
  
      phonenumber :{
          type: Number,
          required:[true, "Please enter your phone number"],
          unique: true,
          trim: true,
          match: [/^(\+?\d{10,15})$/, "Phone number is invalid"],

      },

    
      gender:{
          type: String,
          enum:["male", "female"],
         required: [true,"gender is required"],
      },

   
       learningtrack:{
        type: String,
        enum:[
           "Backend Development",
           "Fullstack Development",
           "Cloud Computing",
           "Cyber Security",
           "Data Analytics"
    ],
       required: [true,"Track is required"],
    },

    attendance: {
        type: [attendanceSchema],
        default: []
    }

},
 {timestamps: true}


  );
  
  // helps us search using index
enrollSchema.index({email: 1});
enrollSchema.index({"attendance.date": 1})

//combine firstname and LAstName togetherto search faster using fullname

enrollSchema.virtual("fullname").get(function (){
    return `${this.firstname} ${this.lastname}`
})

enrollSchema.methods.getAttendancePercentage = function (){
    //step 1: Check if student has attendance record
    if(this.attendance.length === 0) return 0;

    //step 2: count how many times they were present

    const presentCount = this.attendance.filter((record) => record.status === "present").length;

    // step 3: calculate the percentage
    // formula: (present days/ total days) * 100

    return ((presentCount / this.attendance.length)* 100).toFixed(2)
}

// method to get attendance by date range
enrollSchema.methods.getAttendanceByDateRange = function (startDate, endDate) {
    return this.attendance.filter((record)=> {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
    })

}

enrollSchema.statics.findLowAttendanceStudents = async (threshold = 75)=> {
    //step 1: Get all students from database
    const students = await this.find({});

    //step 2: filter students with attendance below threshold
    return students.filter((student) => {
        const percentage = student.getAttendancePercentage();
      return parseFloat(percentage) < threshold;
    })
}
  
  const Enroll = mongoose.model("Enroll", enrollSchema)
  export default Enroll;