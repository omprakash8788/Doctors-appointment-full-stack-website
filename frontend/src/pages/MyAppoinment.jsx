import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppoinment = () => {
  const {doctors}=useContext(AppContext)

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        {/* right now we dont have the appointment data, so instend of appointment data we will display the doctores data, and when we will create the backend and appointment booking system then we will display the user appointments in the page */}
       {
        doctors.slice(0,3).map((item, index)=>(
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
               <div>
                <img className="w-32 bg-indigo-50" src={item.image} alt="img" />
               </div>
               <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.name}</p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs">{item.address.line2}</p>
                <p className="text-sm mt-1"> <span className="text-sm text-neutral-700 font-medium">Date & Time : </span>25 june 2025 | 6:20 AM</p>
               </div>
               {/* In this div we will not add anythings in this one we will add the structure so that we can make this component responsive */}
               <div>

               </div>
               <div className="flex flex-col gap-2 justify-end">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-800 hover:text-white transition-all duration-300">Pay Online</button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel Appointment</button>

               </div>

          </div>
        ))
       }

      </div>
    </div>
  );
};

export default MyAppoinment;
