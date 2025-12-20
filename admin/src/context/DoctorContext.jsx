import React from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

// 1. Create context
export const DoctorContext = createContext();

// 2. After that create context provider function.
const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  //now we have backend url to make the Api call
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  console.log(appointments);
  const [dashData, setDashData] = useState([]);

  const getAppointment = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        // setAppointments(data.appointments.reverse());
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appoitnmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appoitnmentId },
        { headers: { dToken } }
      );
      //check
      if (data.success) {
        toast.success(data.message);
        getAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appoitnmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appoitnmentId },
        { headers: { dToken } }
      );
      //check
      if (data.success) {
        toast.success(data.message);
        getAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
//dashboard
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });
      console.log("line 84", data);
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //here create one variable with the name value and it is going to be a object.

  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the DoctorContext.
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointment,
  };

  useEffect(() => {
    if (dToken) {
      localStorage.setItem("dToken", dToken);
      getAppointment();
    } else {
      localStorage.removeItem("dToken");
    }
  }, [dToken]);
  //3
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
