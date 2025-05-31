import mongoose from "mongoose";

//Create function for connect database.
const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("mongodb data base connected")
  );
  await mongoose.connect(`${process.env.MONGODB_URI}/presripto`);

  // "/presripto" <<<<---------- This is database name. This will you see in mongodb database collection. So whenever our db connection establish then it visible.
  
};

export default connectDB;
