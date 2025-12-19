import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
const DoctorAppointment = () => {
  const { dToken, appointments, getAppointment } = useContext(DoctorContext);
  console.log(appointments)
  useEffect(() => {
    if (dToken) {
      getAppointment();
    }
  }, [dToken]);
  return <div>DoctorAppointment</div>;
};
export default DoctorAppointment;
