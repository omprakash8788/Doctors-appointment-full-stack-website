import express from 'express';
import { getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
// create the instance of the router using express.
const userRouter = express.Router();
// After that we will create the API using this router.
// just add the api endponits to register the user.
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authUser, getProfile)

userRouter.post('/update-profile',upload.single('image'),authUser, updateProfile)
//upload.single('image') --> upload is a middleware, single is a method, and inside single method we passing field name in which we send the image.
// authUser - it is a middleware

userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments',authUser ,listAppointment)
userRouter.post('/cancelled-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
// authUser- So whenever we call the API then we will provide the token in the header and then we will be able to get the user profile details.

//After that export this function.
export default userRouter;
