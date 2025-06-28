import React, { useContext } from "react";
import { assets } from "../assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  // First get the AToken from the AdminContext
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken(""); // here we checking if aToken have token in that case we will call setAToken and we will set it with empty string.
    aToken && localStorage.removeItem("aToken"); // if aToken avaliable in that case we will call the local storage remove item and here we will remove the "aToken".
  };
  // After that connect this function in button tag.
  
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-blue-600 text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
