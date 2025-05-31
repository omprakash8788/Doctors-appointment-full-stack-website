
import express from 'express'
import cors from "cors"
import 'dotenv/config' // Using this we will get the support of envrionment variable in our backend project.
import connectDB from './config/mongodb.js'

// app config
// create app instance using this express package.
const app=express() // This is an express function which we import on top.
// After the defined the port number 
const port = process.env.PORT || 4000;
// After that call connectDB function.
connectDB();


// middlewares - here we add some middleware in our express app.
app.use(express.json()) // in this "use" middleware function we will provide any function that will work as middleware. This will act as a middleware "express.json()".

// After that add one more middleware 
app.use(cors()) //This will allow frontend to communicate with backend.
//After that create api endpoint 

// api endpoints 
// Create one endpoint for testing 
app.get('/',(req, res)=>{
  res.send("Api working")
})

// After that we have to start the express app 

//So, To start the app just write app.listen 

// start app
app.listen(port,()=>{
    console.log("Server started", port)
})
