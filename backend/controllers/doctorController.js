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

// here we will create one function so that we will get the all doctors in the frontend 

const doctorList=async(req, res)=>{
  try {
    const doctors=await doctorModel.find({}).select(['-password', '-email'])
    // find({}) -- here we get all doctors
    //.select(['-password', '-email']) ===>>> now from the doctors data we need to remove doctors passsword and email property, so we will not get the email and password of the doctor on the frontend api.

    // Next create the response
    res.json({success:true, doctors})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

export {changeAvailablity, doctorList}