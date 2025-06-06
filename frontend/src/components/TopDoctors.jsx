import React, { useContext } from "react";
// import { doctors } from '../assets/assets_frontend/assets'
// here we are importing drom the asset files, instend of this now we can import it from context file.

import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  // use context api and import doctors from that file
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Discover the most trusted and experienced doctors available for online
        appointment booking
      </p>

      <div className="w-full custom-grid  grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appoinment/${item._id}`)}
            key={index}
            className="border border-blue-300 rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-100" src={item.image} alt="doc" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-100 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
