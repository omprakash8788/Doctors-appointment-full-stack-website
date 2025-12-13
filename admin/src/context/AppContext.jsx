import React from "react";
import { createContext } from "react";
// 1. Create context
export const AppContext = createContext();
// 2. After that create context provider function.
const AppContextProvider = (props) => {
  //here create one variable with the name value and it is going to be a object.
  // const calculateAge = (dob) => {
  //   const today = new Date();
  //   const birthDate = new Date(dob);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   return age;
  // };

  const calculateAge = (dob) => {
  if (!dob) return "N/A";

  // dob = "25-06-2002"
  const [day, month, year] = dob.split("-");
  const birthDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(birthDate.getTime())) return "N/A";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

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

  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the AppContext.
    calculateAge,
    slotDateFormat
  };
  //3
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
