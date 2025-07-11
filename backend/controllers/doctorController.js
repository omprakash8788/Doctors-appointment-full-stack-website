import doctorModel from "../models/doctorModel.js";



const changeAvailablity = async(req, res)=>{
  try {
       // in this block add the logic
    //1    first get the doctor id.
    const {docId}=req.body;
    //2. After that we had to find the doctors data using the "docId"
    const docData= await doctorModel.findById(docId)
    //3. After that check doctor avaliable property
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    // (docId,{available:!docData.available}) -- It means which property we want to update so in our case we want to update available property.

    //4. After that we had to send response.
    res.json({success:true, message:"Availablity Changed"})
    

  } catch (error) {
       console.log(error)
       res.json({success:false, message:error.message})
  }
}

export {changeAvailablity}