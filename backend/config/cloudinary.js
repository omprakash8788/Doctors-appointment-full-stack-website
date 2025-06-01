
import {v2 as cloudinary} from 'cloudinary';


// After that create arrow function 
const connectCloudinary=async()=>{
    // after that use cloudinary.config function to connect with cloudinary
    cloudinary.config({
        //defined cloude name, api key, and api secret.
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary;