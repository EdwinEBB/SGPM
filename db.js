const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/SGBM";

const connectamongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Conexion a mongo lista");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectamongo;