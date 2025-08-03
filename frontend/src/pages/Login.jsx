import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //1. It will manage login state.
  const [state, setState] = useState("Sign Up"); // Sign Up // Login
  // 2. After that we will create three state variable to store the value of input fields.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();


  // Note - so we have three sepearte state variable for, email, password, name that store the value.
  // Now using this state variable we will call the API.

  // Now whenever we logged in or signup then we will recevice one token.

  // To save the token let come to the "context" in that open "AppContext.jsx" file.

  const {token, setToken, backendUrl} = useContext(AppContext)


  // For form handling create one function.
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // make the API call here
    try {
      
      // here we will check if our state is "sign up" then we are going to call the register API and if the state is Login then we will call the "Login API".
      // For registration and login based on state.
      if(state=== 'Sign Up'){
       const {data} = await axios.post(backendUrl+ '/api/user/register', {name, password, email})
      //'/api/user/register' ---> API address for register the user
      // {name, password, email} --> in body we adding this information, while registering the users.

       if(data.success){
        // If the data.success is true then we have successully created the account and we will save the token.
        localStorage.setItem('token', data.token) // here we will save the token in local storage as well as in state variable('token' , which we got from Appcontext);
        
        // After that save the token in the state variable as well.
        setToken(data.token);

       }else{
        toast.error(data.message)
       }
      }
      else{
         const {data} = await axios.post(backendUrl+ '/api/user/login', {password, email})
      //'/api/user/login' ---> API address for login
      // {password, email} --> in body we adding this information, while logined the users.

       if(data.success){
        // If the data.success is true then we have successully created the account and we will save the token.
        localStorage.setItem('token', data.token) // here we will save the token in local storage as well as in state variable('token' , which we got from Appcontext);
        
        // After that save the token in the state variable as well.
        setToken(data.token);

       }else{
        toast.error(data.message)
       }
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error)
      
    }
  };

  useEffect(()=>{
     if(token){
      // if we have the token in our login page then we will send the user on the home page.
      // if token is true , it means you are login.
      navigate('/')
     }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {
          state === "Sign Up"  &&   <div className="w-full">
          <p>Full Name</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* onChange={(e)=>setName(e.target.value)}  - so whenever we will change the input fields that value will get store in the state variable. */}
        </div>
        }
       

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-[var(--color-primary)] text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {/* base on action change the text */}
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={()=>setState('Login')} className="text-blue-600 underline cursor-pointer">
              {" "}
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span onClick={()=>setState('Sign Up')} className="text-blue-600 underline cursor-pointer">
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
