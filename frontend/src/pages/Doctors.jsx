import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const [showFilter, setShowFilter]=useState(false)

  const [filterDoc, setFilterDoc]=useState([])
  // for get this we will use useParams hooks
  const {speciality} = useParams();
  // console.log(speciality)
  //And here we will get all doctors from the context API.
  const {doctors} = useContext(AppContext)
  // console.log(doctors);
  const navigate = useNavigate();

  
  const applyFilter = ()=>{
    // here we will check if speciality is available then we are going to set doctors according to "speciality" data
    if(speciality){

      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
      // (doc=>doc.speciality===speciality)- here we will check if doc.doc.speciality === speciality(http://localhost:5175/doctors/Gynecologist) , from the parameters , in that case we are going to save the doctors , else we will filter out the others doctors
    }
    else{
      // Suppose here " if(speciality){" we are not get anything then we will add the "doctors" in setter function  setFilterDoc.
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()
  },[doctors, speciality])


  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-blue-800 text-white" :""}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>

        {/* Left menu section */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex":"hidden sm:flex"}`}>
          <p onClick={()=>speciality==="General physician" ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General physician" ? "bg-indigo-100 text-black" :""}`}>General physician</p>

          <p onClick={()=>speciality==="Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist" ? "bg-indigo-100 text-black" :""}`}>Gynecologist</p>

          <p onClick={()=>speciality==="Dermatologist" ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist" ? "bg-indigo-100 text-black" :""}`}>Dermatologist</p>

          <p onClick={()=>speciality==="Pediatricians" ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians" ? "bg-indigo-100 text-black" :""}`}>Pediatricians</p>
          
          <p onClick={()=>speciality==="Neurologist" ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist" ? "bg-indigo-100 text-black" :""}`}>Neurologist</p>

          <p onClick={()=>speciality==="Gastroenterologist" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist" ? "bg-indigo-100 text-black" :""}`}>Gastroenterologist</p>
        </div>
        {/* write side All doctors list */}
        <div className='w-full grid custom-grid gap-4  gap-y-6'>
        {
            filterDoc.map((item, index)=>(
             <div onClick={()=>navigate(`/appoinment/${item._id}`)} key={index} className='border border-blue-300 rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                 <img className='bg-blue-100' src={item.image} alt="doc" />
                 <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                 </div>
             </div>
            ))
        }
        </div>
      </div>
    </div>
  )
}

export default Doctors
