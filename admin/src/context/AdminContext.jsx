import React, { useState } from "react";
import { createContext } from "react";

// 1. Create context
export const AdminContext = createContext();

// 2. After that create context provider function.
const AdminContextProvider = (props) => {
  //here create one variable with the name value and it is going to be a object.
  //1.a -- create state variable to store the token
  const [aToken, setAToken] = useState(
    // here we will check if the local storage.getItem then provide token if the local storage has this token 'aToken' then we will add the value of the token and if local storage not availble then provide the empty string
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  console.log(aToken);
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the AdminContext.
    //1.b---> pass value here
    aToken,
    setAToken,
    backendUrl,
  };
  //3
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
