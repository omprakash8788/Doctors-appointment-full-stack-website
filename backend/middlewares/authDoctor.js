import jwt from "jsonwebtoken";

// Doctor authentication middleware.
const authDoctor = async (req, res, next) => {
  //  next- It is a callback function.
  try {
    //In try block we will add the logic to verify the token. so that if we get any req and in the headers, if we have the token then only we will allow the user to make the Api call otherwise we will terminate that Api call in this middleware

    // So first we have to get the token from the headers.
    // While sending the token we will name it "admintoken"(atoken).
    const {dtoken } = req.headers;
    // If not token
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    // if we have token then verify it.
    // To verify the token first we have to decode the token.
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    // After that we will get the decoded token in this variable "token_decode". That wll going to be our email id and password , this is a refrence "token = jwt.sign(email+password".
     
    // Before setting req.body.userId, make sure that req.body is defined.
     // Ensure req.body exists
    req.body = req.body || {};

    // token_decode -- we will get the user id from the token decode, and we will provide that in the user body.
    req.body.docId = token_decode.id // by doing this we will get the doc id from the token and it will be added in the req.body and we can use this doc id in our controller function.

   
    // if token is matching with email + password then simply call the (next) callback function.
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default authDoctor;
