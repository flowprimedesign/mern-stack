import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

export const connectDB = async () => {
  try {
    //console.log("MONGO_URI:", process.env.MONGO_URI); //debugging log
    const conn = await mongoose.connect(process.env.MONGO_URI);

    //console.log("MongoDB Connected: ${conn.connection.host}");
  } catch (error) {
    console.error("Error4: ${error.message}", error); //debugging log
    process.exit(1);
  }
};

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected: ${conn.connection.host}");
//   } catch (error) {
//     console.error("Error: ${error.message}");
//     process.exit(1);
//   }
// };
