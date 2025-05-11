import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialtyMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
      {/*   <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">
                    Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                  </a> */}
      {/* we are passing this id , in Header.jsx a tag is the example of that. */}
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Our expert cardiologists specialize in diagnosing and treating
        conditions related to the heart and blood vessels.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
       {
        specialityData.map((item, index)=>(
         <Link onClick={()=>scrollTo(0,0)} className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500" key={index} to={`/doctors/${item.speciality}`}>
          <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
          <p>{item.speciality}</p>
         </Link>
        ))
       }
      </div>
    </div>
  );
};

export default SpecialtyMenu;
