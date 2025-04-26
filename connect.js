const mongoose = require("mongoose");
const connectDB = async () => {
  const connectionString =
    process.env.ENVIROMENT == "LOCAL"
      ? process.env.LOCAL_DATABASE
      : process.env.PROD_DATABASE;
  try {
    await mongoose.connect(connectionString);
    console.log("Database connected..");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;
