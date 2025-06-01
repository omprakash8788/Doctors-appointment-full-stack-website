
import multer from "multer";


// create disk storage configuration 
const storage=multer.diskStorage({
    // here we will define the file name
    filename:function(req, file, callback){
        // In this function we will call the callback function.
        callback(null, file.originalname)

        //file.originalname-->  Save the uploaded file with its original name
        
    }
})

// so now we have created the configuration for the disk storage.

// now create the instance of the multer using the diskstorage.
const upload = multer({
    // in this object we will add storage configuration.
    storage
})

// After that export the upload file.
export default upload;
