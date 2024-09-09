import jsonwebtoken from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const verifyJWT = asyncHandler((req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jsonwebtoken.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      console.log(decoded);
      next();
    }
  );
});
