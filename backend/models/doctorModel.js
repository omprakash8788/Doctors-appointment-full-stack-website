import mongoose from "mongoose";

// In this variable we will store mongoose schema
const doctorSchema= new mongoose.Schema({
    // here we will defined the schema property for the doctor data with type.
    // name: by donig this we will provide the doctor name to create a doctor profile in the database. same for others as well.
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },

    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        // required:true
        default:true
    },
    fees:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    slots_booked:{
        type:Object,
        default:{}
    },
},{minimize:false})
// To store the any empty object data "},)" inside you can add {minimize:false}, so if we use minimize then we can use default {} empty object value.

// Now we have created the doctor schema. using this schema we will create one doctor model.

const doctorModel= mongoose.models.doctor || mongoose.model('doctor', doctorSchema)
// 'doctor' is a model name.
//  mongoose.model('doctor', doctorSchema) ->> It will create the doctor model, so whenever our project get start  this statment will be get excauted "mongoose.model('doctor', doctorSchema)". Then it will create the model for multile times(Which is bad, we want only one time model should be created not multiple time), so to prevent that add logic.

// mongoose.models.doctor ||  ---> so here we will checking models.doctor is available then we are going to use that model, and if it not available then we will create this model using this doctorSchema "mongoose.model('doctor', doctorSchema)".

// After that export the model.
export default doctorModel;



