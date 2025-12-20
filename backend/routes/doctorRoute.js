// import express from express;
import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentDoctor,
  doctorList,
  loginDoctor,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
//create router instance
const doctorRouter = express.Router();
// using doctorRouter we will create multiple routes
// Endponit for get all doctor list
doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/cancel-appointment", authDoctor, appointmentCancel);

// After that export the doctorRouter
export default doctorRouter;
