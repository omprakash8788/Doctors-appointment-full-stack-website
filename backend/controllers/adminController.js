import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

//API for adding doctor
const addDoctor = async (req, res) => {
  // (req, res)--> we are getting both as a parameters
  // In this controller function we will get the data from the request
  // So, whenever we call the APIs the we will pass the doctor name , email, password, image, and all others details
  try {
    //1. we will gets these all data from the request.
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
    } = req.body; // here we will receive the information from req.body;
    //2. Now we will send these data using formData.
    //So whenever we will call API then we will add these data in formData format.
    // So to pass the formData we need a middleware

    // After that we need the image file that will be parse using the "upload.single('image')" middleware
    const imageFile = req.file; // by using this we will get the file and store in the variable.

    // now just remove console
    // checking for all data to add doctor - here we check every fields sholud have value or data then only send to database.
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      // by adding this if anyone of these data missing we will excaute if block.
      return res.json({ success: false, message: "Missing Details" });
    }
    //  After that validate the email
    // validating email format.
    if (!validator.isEmail(email)) {
      // if the email is not in valid format then this if block will excaute.
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    //After that validate the password
    // Validating strong password
    if (password.lenght < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // After that encrypt the password and save in database
    // Encryption password.
    // First, we have to generate one salt to hash the password.
    //Hashing doctor password.
    const salt = await bcrypt.genSalt(10); // genSalt method - here we pass 10, it is number of round.
    // After that create variable for hash password.
    const hashedPassword = await bcrypt.hash(password, salt);
    // After that we will get one encrypted password in the "hashedPassword" variable.

    //Next, we have to upload the image file on the cloudinary so that we will get image url.
    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    // uploader
    // upload - it is a method, in this method we have to provide our imageFile path"imageFile.path", after that we have to define resource type (resource_type:"image")
    //After "await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})" this statement it will generate one response that will store inside "imageUpload" variable.

    //In this imageUpload variable we will get one image link
    const imageUrl = imageUpload.secure_url;
    //next we have to save this data in the database.
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    // After that store doctorData in obj.
    const newDoctor = new doctorModel(doctorData);
    // After adding this we have to save newDoctor in the database.
    await newDoctor.save(); // After this line our data will be save in database.
    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API for the admin login.
const loginAdmin = async (req, res) => {
  try {
    // in this try block we first get the email ID and password from the request. And we will match the email ID and password with this .env variable of the admin email and password.
    // If it is matching in that case we will create a token using the jsonwentoken.

    //So, first here we will get the email id and password.
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // if both the condition true then we will generate token.
      // create token and send to the user.
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      // sign() ->>> here we have to provide one data so we can encrypt the data and create a token
      // email+password => this will be string
      // jwt.sign(email+password, process.env.JWT_SECRET) --> By excauting this statenent we will get a token.
      // Next, we have to send this token as a response.
      res.json({ success: true, token });
      //Next test this API.
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    //.select('-password') - i dont need password so i just write .select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Api to get all appointmemt list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}); // here you will get all the appointment
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Api for appointment cancellation
const appointmentCancellation = async (req, res) => {
  try {
    // First we will get userId and appointmentId from the request.
    const { appoitnmentId } = req.body;
    //now we will get the appointmentId from the users request body and we provide this userId with authentication middleware
    const appointmentData = await appointmentModel.findById(appoitnmentId);
    //Next, we have to check this appointmentData user id same with the appointmentId then user can cancel the appointment

    // if user id match perform next task
    await appointmentModel.findByIdAndUpdate(appoitnmentId, {
      cancelled: true,
    });
    //Note - cancelled --> this propeerty is inside appointmentModel so by defaut it is false , so if user cancel make it true
    // Releasing doctor slots
    //here first get the doctor id , slot date and slot time
    const { docId, slotDate, slotTime } = appointmentData;
    //After that find the doctor using docId
    const doctorData = await doctorModel.findById(docId);
    // Next, we extract the slot booked data
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    //After that we have to update the latest slot data with the doctors data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get dashboard data for admin panel
const adminDashboard = async(req, res)=>{
   try {
    //In try block we need total number of user and total number of appointments
    const doctors = await doctorModel.find({}); // by using this we will get all doctors data , same for 'users' and 'appointments'
    const users= await userModel.find({});
    const appointmemts = await appointmentModel.find({});

    const dashData = {
      doctors:doctors.length,
      appointmemts: appointmemts.length,
      patients : users.length,
      latestAppointments : appointmemts.reverse().slice(0,5),
    }
    res.json({success:true, dashData})
   } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });
   }
}

export {
  adminDashboard,
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancellation,
};
