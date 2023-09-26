const mongoose = require("mongoose");
const mongoURI=process.env.mongoURI;

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