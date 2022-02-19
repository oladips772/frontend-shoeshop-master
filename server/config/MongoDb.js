/** @format */
import mongoose from "mongoose";

const connectDataBase = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected to server");
  try {
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};
export default connectDataBase;
