import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect("mongodb://localhost/genres");
    console.log(`Connected to database at  ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbConnection;
