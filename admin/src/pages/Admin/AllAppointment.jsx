import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";

const AllAppointment = () => {
  const { aToken, appointments, setAppointments, getAllAppointments } =
    useContext(AdminContext);
  console.log(appointments);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return <div>AllAppointment</div>;
};

export default AllAppointment;
