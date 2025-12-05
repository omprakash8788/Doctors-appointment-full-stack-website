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

  // here we create one state where we will store user data.
  const [userData, setUserData] = useState(false);
  // After that create arrow functio, using that we get the user data and save the data into state variable.
  const loadUserProfileData = async ()=>{

    try {
         const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}});
      // {data} --> here we will store the respons info of user.
      if(data.success){
         setUserData(data.userData)
      }
      else{
        toast.error(data.message)
      }

      
    } catch (error) {
       console.log(error);
       toast.error(error.message)
    }
  }

  

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

  // Run the function whenever the user will be login 
    useEffect(()=>{
      if(token){
        loadUserProfileData()
      }
      else{
        setUserData(false)
      }
  },[token])

  // in this function we will add one variable with the "value"
  const value={
    // Whatever we add in the value obj, we can access that in any component.
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  }
  return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;