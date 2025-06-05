import { createContext } from "react";

// 1. Create context
export const AdminContext = createContext();

// 2. After that create context provider function.
const AdminContextProvider = (props) => {
  //here create one variable with the name value and it is going to be a object.
  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the AdminContext.
  };
  //3
  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
