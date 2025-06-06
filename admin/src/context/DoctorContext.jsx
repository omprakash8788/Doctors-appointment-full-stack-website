import React from "react";
import { createContext } from "react";

// 1. Create context
export const DoctorContext = createContext();

// 2. After that create context provider function.
const DoctorContextProvider = (props) => {
  //here create one variable with the name value and it is going to be a object.
  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the DoctorContext.
  };
  //3
  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
