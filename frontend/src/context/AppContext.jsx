import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext() // here we created AppContext

// After that we have to create the context provider function

const AppContextProvider = (props)=>{
  const currencySymbol= '$'


  // in this function we will add one variable with the "value"
  const value={
    // Whatever we add in the value obj, we can access that in any component.
    doctors,
    currencySymbol
  }
  return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;