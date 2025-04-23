const mongoose = require("mongoose");
const connectDB = async () => {
  const prodDatabase = process.env.PROD_DATABASE;
  const localDatabase = process.env.TEST_DATABASE;
  try {
    await mongoose.connect(prodDatabase);
    console.log("Database connected..");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;
