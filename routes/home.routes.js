import { Router } from "express";

const router = Router();
router.route("/").get((req, res) => {
  res.send("Welcome Abord!!!");
});

export default router;
