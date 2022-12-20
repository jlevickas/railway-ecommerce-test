import mongoose from "mongoose";
import { MONGO_URI } from "../../config/config.js";

const mongoConnection = async () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });

  return db;
};

export default mongoConnection;
