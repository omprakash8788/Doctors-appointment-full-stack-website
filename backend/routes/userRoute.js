import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
// create the instance of the router using express.
const userRouter = express.Router();
// After that we will create the API using this router.
// just add the api endponits to register the user.
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser)

//After that export this function.

export default userRouter;
