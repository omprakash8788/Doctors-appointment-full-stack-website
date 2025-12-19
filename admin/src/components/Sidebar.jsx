import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  // First import aToken from the Admin context.
  const { aToken } = useContext(AdminContext);
  const {dToken}=useContext(DoctorContext)
  // After that in div add ternary operator
  return (
    <div className="min-h-screen bg-white border-r">
      {/* here we will check if we have AToken in that case we will return one UL tag */}
      {aToken && (
        <ul className="text-[#515151] mt-5">
          {/* in this ul tage we will create sidebar */}
          {/* in navlink we are using dynamic classname- inside obj{} we pass 'isActive' we are getting inside obj. so if our navlink is active it means the "isActive" will be true and if this navlink not active then "isActive" property will be false */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="icon" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""
              }`
            }
            to={"/all-appointment"}
          >
            <img src={assets.appointment_icon} alt="icon" />
            <p>Appontments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="icon" />
            <p>Add Doctors</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="icon" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {/* for doctor */}
        {/* here we will check if we have AToken in that case we will return one UL tag */}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          {/* in this ul tage we will create sidebar */}
          {/* in navlink we are using dynamic classname- inside obj{} we pass 'isActive' we are getting inside obj. so if our navlink is active it means the "isActive" will be true and if this navlink not active then "isActive" property will be false */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="icon" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""
              }`
            }
            to={"/doctor-appointment"}
          >
            <img src={assets.appointment_icon} alt="icon" />
            <p>Appontments</p>
          </NavLink>
      
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-600" : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="icon" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
