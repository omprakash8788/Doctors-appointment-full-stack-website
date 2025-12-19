import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  // here We will create one state variable and by using that we will manage the admin login and doctor login
  const [state, setState] = useState("Admin");

  // create state to store email and password.
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('');
  // After that link to input fields


  // this token come from AdminContext file
  const {setAToken, backendUrl}=useContext(AdminContext);
  // After that we will de-structure the backend url
 // By using this "{setAToken, backendUrl}" we called the API in this page.

 const {setDToken} = useContext(DoctorContext)
//  so, before calling the API we will create two state variable to store the email id and password.
 
//  now create funnction for this form, so when we submit jsx form then that function will be excauted.
const onSubmitHandler = async(e)=>{
 e.preventDefault();

//  After that we have to do one API call
try {
  // in this try block we will call the API call
  if(state==="Admin"){
   // this block will add the logic to login the admin
    const {data}=await axios.post(backendUrl + '/api/admin/login', {email, password})
    if(data.success){
      // console.log(data.token)
      localStorage.setItem('aToken', data.token)
      setAToken(data.token) // before that also set in local storage
    }else{
      toast.error(data.message)
    }

  }else{
    // here we will call the doctor login api
    const {data} = await axios.post(backendUrl + "/api/doctor/login", {email, password});
    if(data.success){
      // console.log(data.token)
      localStorage.setItem('DToken', data.token)
      setDToken(data.token) // before that also set in local storage
      console.log(data.token)
    }else{
      toast.error(data.message)
    }



  }
  
} catch (error) {
  console.log(error)
  
}
}

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex item-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-blue-700"> {state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1 "
            type="email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1 "
            type="password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            // so whenever you will update these data it will set in state variable
            placeholder="Enter Your Password"
          />
        </div>
        <button className="bg-blue-700 text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span className="text-blue-600 underline cursor-pointer" onClick={() => setState("Doctor")}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span className="text-blue-600 underline cursor-pointer" onClick={() => setState("Admin")}>Click here</span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
