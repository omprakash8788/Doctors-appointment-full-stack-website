import mongoose from "mongoose";
const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("mongodb data base connected")
  );
  await mongoose.connect(`${process.env.MONGODB_URI}/presripto`);  
};
export default connectDB;
