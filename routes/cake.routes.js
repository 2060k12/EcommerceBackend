import { Router } from "express";
import {
  uploadCake,
  getAllCakes,
  getCakeById,
} from "../controller/cake.controller.js";

const router = Router();

router.route("/uploadCake").post(uploadCake);
router.route("/getAllCakes").get(getAllCakes);
router.route("/getCakeById/:id").get(getCakeById);

export default router;
