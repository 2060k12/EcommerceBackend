import { Router } from "express";
import {
  uploadCake,
  getAllCakes,
  getCakeById,
} from "../controller/cake.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.route("/uploadCake").post(uploadCake);
router.route("/getAllCakes").get(verifyJWT, getAllCakes);
router.route("/getCakeById/:id").get(verifyJWT, getCakeById);

export default router;
