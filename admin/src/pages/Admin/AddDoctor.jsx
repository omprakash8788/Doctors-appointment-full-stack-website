import React, { useContext, useState } from "react";
import { assets } from "../../assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify';
import axios from 'axios'
const AddDoctor = () => {
  // Create state variables
  //1. First create state variable to store the image file.
  const [docImg, setDocImg]=useState(false);
  // 2 - Create state for name
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [experience, setExperience]=useState('1 Year');
  const [fees, setFees]=useState('');
  const [about, setAbout]=useState('');
  const [speciality, setSpeciality]=useState('General physician');
  const [degree, setDegree]=useState("");
  const [address1, setAddress1]=useState("");
  const [address2, setAddress2]=useState("");
  // here we will create all require state so we can to that area.
  // After that link these state variable.
  // get backend url and token
  const {backendUrl, aToken} = useContext(AdminContext)
  const onSubmitHandler= async(e)=>{
    e.preventDefault();
    // in this for we will call our Api so that we can add the "doctor" in the database from our admin panel.
    try {
      // check for image
      if(!docImg){
        return toast.error("Image Not Selected")
      }
      // Afer that create one form data for entire state.
      const formData= new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees',Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({line1:address1, line2:address2}));
      // now let check the form data
      // console log form data
      formData.forEach((value, key)=>{
         console.log(`${key} : ${value}`);
      })
      // Make the Api call to the backend to save the doctor details on the database.
      const {data}=await axios.post(backendUrl + "/api/admin/add-doctor", formData, {headers:{aToken}})
      // backendUrl + "/api/admin/add-doctor"==>> backend url we contact with Api address so it look like this (http://localhost:4000/api/admin/add-doctor)
      //  formData==> then we provide the formData
      //  {headers:{aToken}} ====>>>>>>> after formData we add headers, and in the headers we will provide the admin token so this authentication get complete and our form data will be store in the databse.

      // check
      if(data.success){
        toast.success(data.message)
        //after that reset the form'
        setDocImg(false);
        setName("");
        setPassword("")
        setEmail("");
        setAddress1("")
        setAddress2("")
        setDegree("");
        setAbout("");
        setFees("");

      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
       toast.error(error.message)
       console.log(error)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          {/*doc-img - passing in both tag label and input  */}
          <label htmlFor="doc-img">
            <img className="w-16 bg-gray-100 cursor-pointer rounded-full"  src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        {/* another div */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className="border rounded px-3 py-2 " type="text" placeholder="Name" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-2 " type="email" placeholder="Email" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-2 " type="password" placeholder="Password" required />
            </div>

            {/* Select option  */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2 " name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            {/* fee section */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className="border rounded px-3 py-2 " type="number" placeholder="fees" required />
            </div>
          </div>

          {/* right section */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2 " name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            {/* eduction details */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className="border rounded px-3 py-2 " type="text" placeholder="Education" required />
            </div>
            {/* address */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2 " type="text" placeholder="Address 1" required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2}  className="border rounded px-3 py-2 " type="text" placeholder="Address 2" required />
            </div>
          </div>
        </div>
        {/* about me section */}
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="border rounded px-4 py-2 w-full" placeholder="Write about doctor" rows={5} required />
        </div>
        {/* button section */}
        <button type="submit" className="bg-blue-600 px-10 py-3 mt-4 text-white rounded-full">Add doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
