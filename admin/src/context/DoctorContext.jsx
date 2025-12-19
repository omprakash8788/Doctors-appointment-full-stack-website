import React from "react";
import { useState } from "react";
import { createContext } from "react";

// 1. Create context
export const DoctorContext = createContext();

// 2. After that create context provider function.
const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  //now we have backend url to make the Api call
  const [dToken, setDToken]= useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );


  //here create one variable with the name value and it is going to be a object.


  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the DoctorContext.
    dToken,
    setDToken,
    backendUrl
  };
  //3
  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
