import React, { useState } from "react";

const Login = () => {
  //1. It will manage login state.
  const [state, setState] = useState("Sign Up"); // Sign Up // Login
  // 2. After that we will create three state variable to store the value of input fields.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // For form handling create one function.
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

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
        <button className="bg-[var(--color-primary)] text-white w-full py-2 rounded-md text-base">
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
