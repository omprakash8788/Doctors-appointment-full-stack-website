import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

// API to register user
const registerUser = async (req, res) => {
  try {
    // in the try block first we get the user name , email id, and password from (req.body)

    // here we will destructure the property.
    const { name, email, password } = req.body; // we are getting this from req body.
    // After that name,email, password. First we have to check.
    // if any of these property is empty that case we will terminate the function and return the response.
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    // After that we are going to validate email, if the email is correct or not.

    // used validator package for email validation. (validating email format)
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
    // After that validate the password.
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // next we can add this user in database.
    // before adding user info in database, first hash the password.

    // used bcrypt for hashing the password.
    // hashing user password.
    const salt = await bcrypt.genSalt(10);
    // After that hashed the password using salt.
    const hashedPassword = await bcrypt.hash(password, salt); // by excuting this statement we will get the hashed password.
    // Next we have to save the hashed password in the database.

    // for that let create one object with the name data.
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    // now you can save this info into database.
    const newUser = new userModel(userData);
    // after that we have created newUser using this userModel
    // next we have to save this newUser in the database.
    const user = await newUser.save(); // by doing this the user will save in the databased.

    // after that in this 'user' object get one _id property and by using this _id property we are going to create one token so that user can login on the website.

    //create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // sign({}) --> sign is a method, in that we adding object as a data
    // In the token we are passing user _id and JWT_secret.
    // so now we have a token .
    // now we can generate the response so we can send the token to the user.
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user Login
const loginUser = async (req, res) => {
  try {
    // in the try block we will get the user email and password from the req.
    const { email, password } = req.body; // here we need to email, and password to login the user so after that using this email id we will find the user data.

    const user = await userModel.findOne({ email }); // After excuting this line of code we will get the user.
    //  userModel.findOne({email}) ==> in userModel we will find user by email, that why we passing email, inside fineOne method.

    //Next, we have to check if the user exist with this email id or not.
    if (!user) {
      // so, if we don't have the any user with this email id then this block will be excuting.
      return res.json({ success: false, message: "User does not exist" });
    }

    // after this if statement , if the the user exist then we have to match the password that we have save in the databased.

    // we will get it from the user login form.
    const isMatch = await bcrypt.compare(password, user.password);

    // bcrypt.compare(password, user.password)
    // compare - it is a function where we passing password and user.password
    // password - we get it from the req.body.
    // user.password - we have hashed and save in the database.
    // and we comaring both , provide password and databaed hashed password.

    // now check password, is match or not.
    if (isMatch) {
      // if it is match then we will create one token and send to the user, so that user can login in the web app.
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // sign()- This is a method.
      // sign({id:user._id}, process.env.JWT_SECRET) --> Passing id , user_id , after that provide JWT_SECRET.
      // After that create the response.
      res.json({ success: true, token });
      // so, in response we adding token.
    } else {
      // if password not match.
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API for get user profile data.
const getProfile = async (req, res) => {
  try {
    // In the try block, we will get the user id, and by using the user id we will get the user data and we will provide the user data to the frontend.

    //so we will get the user id by using the authentication.
    const { userId } = req.body; // we will not get the userId from the user, user will send the token and using that token we will get the userId. and we will add the user id in the req dot body.

    // now to change the header to the userId, we are going to create one middleware with the name authUser.js

    // {userId} = req.body --> after getting from req.body we have to find this user.

    // To find the user, we have to get the user data.
    const userData = await userModel.findById(userId).select("-password");

    // .select('-password') --> It will removed the password property from the userData variable.
    // After that we will create just one response
    res.json({ success: true, userData });
    // so in res.json, we sending userData.
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for update user profile.
const updateProfile = async (req, res) => {
  try {
    // To update the profile, first we need the data from the req.
    const { userId, name, phone, address, dob, gender } = req.body;
    //so, we also recevice image.
    const imageFile = req.file;

    //After that add check.
    if (!name || !phone || !dob || !gender) {
      //if any of these property is not available then we will generate one response.
      return res.json({ success: false, message: "Data missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // userId, {name, phone, address:JSON.parse(address), dob, gender} -- Proving userId with other fields , so we can update the user info.

    // After that we check image also.
    if (imageFile) {
      // we will upload image on the cloudinary and save in the user data image property.

      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      // After that you got image url, then you save in one variable.
      const imageUrl = imageUpload.secure_url;
      // Next, we have to save the imageUrl in the user data.
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    //1. First get the userId ,docId, slotTime
    const { userId, docId, slotDate, slotTime } = req.body;
    // After that here we get doctor data using this 'docId'
    const docData = await doctorModel.findById(docId).select("-password");
    // What - docData -> here we getting doctor data based on the docId
    //.select('-password') - While using this we will removed the password from doctor info

    //After that check if the doctor is avaliable or not to take the booking
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not availabel" });
    }
    // So, if doctor is availabel then we get slot data
    let slots_booked = docData.slots_booked;
    // slots_booked  -- In this var we get all slot booked data

    // Checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not availabel" });
      } else {
        // in that block we book the slot
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      // So, suppose we dont have the slots_books[slotDate] so nobody has book the appointment on the particular date.
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // for user
    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;
    /* What - we are removing property from here ->> docData: {
    type: Object,
    required: true,
  }, 
  when we saved our appointment then we are going to saved in docData
  and we dont want to the history of the slot_booked that why we removing this property "  delete docData.slots_booked;" from the docData
  
  */

    //After that we will create one var for appointment data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    //After that saved these data into databased.
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //Saved new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    // docId, {slots_booked} - using this it will update the slot for that specific doctor
    res.json({ success: true, message: "Appointment Book" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user appointment for frontend my-appointment page
const listAppointment = async (req, res) => {
  try {
    //Fist get the user id from the request
    const { userId } = req.body;
    //After that store all the appointment of the user
    const appointments = await appointmentModel.find({ userId });
    // userId - so when we created the data you can see in the databased appointment collection we have added the "userId" property by using this userid property to find the prticular user
    //After that we need to send this data as a response
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    // First we will get userId and appointmentId from the request.
    const { userId, appoitnmentId } = req.body;
    //now we will get the appointmentId from the users request body and we provide this userId with authentication middleware
    const appointmentData = await appointmentModel.findById(appoitnmentId);
    //Next, we have to check this appointmentData user id same with the appointmentId then user can cancel the appointment
    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
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

// Razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.Razorpay_key_id,
  key_secret: process.env.Razorpay_key_secret,
});

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    //To booked the online appointment we need appointment id
    const { appoitnmentId } = req.body;
    //After that we have to get the appointment data using this appointmentid,
    const appointmentData = await appointmentModel.findById(appoitnmentId);
    //After getting appointment data first we will check appointment data
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    //create option for razorpay payment
    // in .env file add this line CURRENCY="INR"
    const options = {
      amount: appointmentData.amount * 100,
      currency: "INR",
      receipt: appoitnmentId,
    };
    // by using options variable we will create one order using razorpay
    // Creation of an order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    //First get razorpay id
    const {razorpay_order_id} = req.body;
    //After that we will get order info by using this "razorpay_order_id"
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    // console.log(orderInfo)
    if(orderInfo.status ==="paid"){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      // Where - payment:true --> inside appointment model you have that key ,initally it is false but once payment done make it true.
      res.json({success:true, message:"Payment Successful"})
    }else{
      res.json({success:false, message:"Payment failed"})
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// export the function.
export {
  verifyRazorpay,
  paymentRazorpay,
  cancelAppointment,
  listAppointment,
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
};
