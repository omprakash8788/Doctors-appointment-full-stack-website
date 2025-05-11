import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Appoinment = () => {
  // In this first get the doctors id.
  // http://localhost:5175/appoinment/doc1 (After clicking on card you get this url with id)
  //1
  const {docId}=useParams();
  //After that here we will get the doctors data from the context.

  // 4
  const [docInfo, setDocInfo]=useState(null)
  console.log(docInfo)

  //2
  const {doctors}=useContext(AppContext);
  // Now find the particular doctors using "docId";

  //3 
  const fetchDocInfo= async()=>{
    const docInfo= doctors.find(doc=>doc._id===docId)
    // find - method
    // (doc=>doc._id===docId) -> here we will check if the doc._id is equal to docId in that case that doctor data will be store in "docInfo" variable.
    // Next we have to create one state variable and we will save the docInfo in that state variable.
    //5
    setDocInfo(docInfo)
    //Next we have to run this function.
  }
  //6
  useEffect(()=>{
   fetchDocInfo();
  },[doctors, docId])

  return (
    <div>
      {/*  */}
    </div>
  )
}

export default Appoinment
