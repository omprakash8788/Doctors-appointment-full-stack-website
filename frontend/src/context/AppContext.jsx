import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext() // here we created AppContext

// After that we have to create the context provider function

const AppContextProvider = (props)=>{
  const currencySymbol= '$'

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors]=useState([])

  // create one state variable where we can store the user authentication token
  const [token, setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token'): false);


  // create arrow function where we will call the Api
  const getDoctorsData=async()=>{
    try {
       const {data}= await axios.get(backendUrl + "/api/doctor/list")
       // {data}= we get the data from the Api response using asios
       console.log(data)
      if(data.success){
        setDoctors(data.doctors)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    getDoctorsData()
  },[])

  // in this function we will add one variable with the "value"
  const value={
    // Whatever we add in the value obj, we can access that in any component.
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl
  }
  return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;