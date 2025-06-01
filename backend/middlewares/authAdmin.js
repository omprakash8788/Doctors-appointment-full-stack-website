import jwt from "jsonwebtoken";

// Admin authentication middleware.
const authAdmin = async (req, res, next) => {
  //  next- It is a callback function.
  try {
    //In try block we will add the logic to verify the token. so that if we get any req and in the headers, if we have the token then only we will allow the user to make the Api call otherwise we will terminate that Api call in this middleware

    // So first we have to get the token from the headers.
    // While sending the token we will name it "admintoken"(atoken).
    const { atoken } = req.headers;
    // If not token
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    // if we have token then verify it.
    // To verify the token first we have to decode the token.
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    // After that we will get the decoded token in this variable "token_decode". That wll going to be our email id and password , this is a refrence "token = jwt.sign(email+password".

    // After decoding the token here we will check , if it is same with the "email+password".
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      // if not match then token is invalid.
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    // if token is matching with email + password then simply call the (next) callback function.
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default authAdmin;
