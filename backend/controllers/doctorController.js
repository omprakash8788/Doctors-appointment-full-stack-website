import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    // in this block add the logic
    //1    first get the doctor id.
    const { docId } = req.body;
    //2. After that we had to find the doctors data using the "docId"
    const docData = await doctorModel.findById(docId);
    //3. After that check doctor avaliable property
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    // (docId,{available:!docData.available}) -- It means which property we want to update so in our case we want to update available property.

    //4. After that we had to send response.
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// here we will create one function so that we will get the all doctors in the frontend

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    // find({}) -- here we get all doctors
    //.select(['-password', '-email']) ===>>> now from the doctors data we need to remove doctors passsword and email property, so we will not get the email and password of the doctor on the frontend api.

    // Next create the response
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    //First we will get email id and password from request.
    const { email, password } = req.body;
    //After that find the doctor using above email id.
    const doctor = await doctorModel.findOne({ email });
    // After that we will get the doctor.
    //add check
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    //Suppose, we find any doctor with provided email id then we will check password that recevice from the body is matching with the password saved in the db.
    const isMatch = await bcrypt.compare(password, doctor.password);
    //password - this is getting from the request.
    // doctor.password - this is hash password from the db()
    if (isMatch) {
      // if it is true then we provide authentication token
      const token = await jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get doctor appointment for doctor panel.
const appointmentDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    //Using this docId we are going to find the appointment of this doctor
    const appointments = await appointmentModel.find({ docId }); //Bu excuting this line we get all the appointments of that "docId" doctor.
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to mark appointment completed for doctor panel.
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appoitnmentId } = req.body;
    //We will get this "docId" from the authDoctor middleware where we convert the token into doctor id. And we pass this appointment id in Api request.
    const appointmentData = await appointmentModel.findById(appoitnmentId);
    if (appointmentData && appointmentData.docId === docId) {
      // appointmentData && appointmentData.docId === docId -> In that case we authenticate the same doctor has loggined with whom appointment is book.
      await appointmentModel.findByIdAndUpdate(appoitnmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to cancel appointment for doctor panel.
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appoitnmentId } = req.body;
    //We will get this "docId" from the authDoctor middleware where we convert the token into doctor id. And we pass this appointment id in Api request.
    const appointmentData = await appointmentModel.findById(appoitnmentId);
    if (appointmentData && appointmentData.docId === docId) {
      // appointmentData && appointmentData.docId === docId -> In that case we authenticate the same doctor has loggined with whom appointment is book.
      await appointmentModel.findByIdAndUpdate(appoitnmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel.
const doctorDashboard = async (req, res) => {
  try {
    //First we will get the doctor id from the request
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    //by using "appointments", we will calculate the earning of this doctor.
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });
    //count number of paients.
    let patients = [];

    // to calculate the total number of unique patients
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        // What - here we are checking first , in item.userId available in that patients array then we are not going to add those patients ,if not is not available then we will add those patients, so we will get total number of unique patients
        patients.push(item.userId);
      }
    });
    //dashbaord data
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  doctorDashboard,
  appointmentCancel,
  appointmentComplete,
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentDoctor,
};
