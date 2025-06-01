import express from 'express'
// After that import addDoctor function.
import { addDoctor, loginAdmin } from '../controllers/adminController.js'
//After that import upload file
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
// now we have imported all three file.
//Next, we have to create the route.
// First we will create the router
const adminRouter= express.Router() // now we have admin router , using this we can create multiple api endpoints.
// Note - upload.single('image'), upload is a middleware, and image is a field name.
adminRouter.post('/add-doctor', authAdmin, upload.single('image'),addDoctor)
// So whenever we will call this endpoint "'/add-doctor'".Then in the formData we have to send the image "upload.single('image')" with the field name 'image' then only our middleware process the image and formData.

// API endpoint for admin login 
adminRouter.post('/login', loginAdmin)

// After that export adminRouter.
export default adminRouter;

