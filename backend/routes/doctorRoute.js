// import express from express;
import express from "express";
import { doctorList, loginDoctor } from "../controllers/doctorController.js";
//create router instance 
const doctorRouter = express.Router();
// using doctorRouter we will create multiple routes
// Endponit for get all doctor list
doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
// After that export the doctorRouter
export default doctorRouter;
