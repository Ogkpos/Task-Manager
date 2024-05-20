import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const port = process.env.PORT;
const DB = process.env.DATABASE_URI;

app.listen(port, "127.0.0.1", async () => {
  console.log(`Connected to server on port ${port}`);

  //connect to DB
  try {
    await mongoose.connect(DB);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error.reason);
  }
});
