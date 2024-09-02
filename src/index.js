import dotenv from "dotenv";
import { app } from "./app.js";
import connectToDatabase from "../db/index.js";

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Listening at port " + process.env.PORT);
    });
  })
  .catch(
    console.error((error) => {
      console.log("MongoDb connection Failed -> " + error);
    })
  );
