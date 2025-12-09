import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
const MyAppoinment = () => {
  const { backendUrl, token, getDoctorsData} = useContext(AppContext);
  // After that we have to create the state variable to store the data
  const [appointment, setAppointment] = useState([]);
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      // {data}  - After excuting this line we will get the data
      if (data.success) {
        //if true then store data in the state variable
        setAppointment(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appoitnmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancelled-appointment",
        { appoitnmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Init pay
  const initPay = (order)=>{
    //order - we are getting from the api response
    const options={
      key:import.meta.env.VITE_Razorpay_key_id,
      amount:order.amount,
      currency:order.currency,
      name:"Appointment payment",
      description:"Appointment payment",
      order_id:order.id,
      receipt:order.receipt,
      handler: async(response)=>{
        console.log(response)

      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  const appointmentRazorpay=async(appoitnmentId)=>{
   try {
    //appoitnmentId 
    const {data} = await axios.post(backendUrl + "/api/user/payment-razorpay", {appoitnmentId},{headers:{token}});
    if(data.success){
      // console.log(data.order)
      initPay(data.order)

    }
   } catch (error) {
         console.log(error);
      toast.error(error.message);
   }

  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {/* right now we dont have the appointment data, so instend of appointment data we will display the doctores data, and when we will create the backend and appointment booking system then we will display the user appointments in the page */}
        {
          // doctors.slice(0,3).map((item, index)=>( - Remove -> doctors.slice(0,3)
          appointment.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt="img"
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-sm mt-1">
                  {" "}
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time :{" "}
                  </span>
                  {/* 25 june 2025 | 6:20 AM */}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              {/* In this div we will not add anythings in this one we will add the structure so that we can make this component responsive */}
              <div></div>
              <div className="flex flex-col gap-2 justify-end">

                {!item.cancelled && 
                <button onClick={()=>appointmentRazorpay(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-800 hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                }

                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {
                  item.cancelled && <button className="sm:min-w-48  py-2 border border-red-500 rounded text-red-500">Appointmemt cancelled</button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyAppoinment;
