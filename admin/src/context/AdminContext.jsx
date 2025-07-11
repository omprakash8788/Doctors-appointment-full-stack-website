import React, { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify';

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

  // 1.
  const [doctors, setDoctors]=useState([])

  const backendUrl = import.meta.env.VITE_BACKENDURL;

  // getAllDoctors from the Api.
  const getAllDoctors=async()=>{
    try {
       const {data}=await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}})
      //  console.log(data)
      if(data.success){
        setDoctors(data.doctors)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
      
    }
  }

  // useEffect(()=>{
  // getAllDoctors();
  // },[])

  // Function for update checkbox property
  const changeAvailability = async(docId)=>{
    try {
        const {data} = await axios.post(backendUrl + "/api/admin/change-availability",{docId}, {headers:{aToken}})
        // {docId} ->>>>>>> this this docId in the body
        // {headers:{aToken}} -->>>>>> In headers we set the admin token.
      // so, now we have created the code for the Api call.
      //Next we have to check if the data.success is true
      if(data.success){
        toast.success(data.message)
        // After that update the getAllDoctors() function
        getAllDoctors();
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
       console.log(error)
    }
  }

  const value = {
    //  So whenever we will add any function and variable value here then we can access in the any component using the AdminContext.
    //1.b---> pass value here
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    
  };
  //3
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
