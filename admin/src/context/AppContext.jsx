import { createContext } from "react";

// 1. Create context
export const AppContext = createContext();

// 2. After that create context provider function.
const AppContextProvider = (props) => {
  //here create one variable with the name value and it is going to be a object.
  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the AppContext.
  };
  //3
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
