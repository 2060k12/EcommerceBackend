import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());
app.use(express.static("public"));

// Importing routes

import homeRouter from "../routes/home.routes.js";
import cakeRouter from "../routes/cake.routes.js";
import userRouter from "../routes/user.routes.js";

app.use("/api/v1/", homeRouter);
app.use("/api/v1/cake", cakeRouter);
app.use("/api/v1/user", userRouter);

export { app };
