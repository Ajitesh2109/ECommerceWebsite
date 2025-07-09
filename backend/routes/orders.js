import { Router } from "express";
const router = Router();
import verifyToken from "../middleware/auth.js";
import createOrder from "../Service/orderServices.js";

router.post("/", verifyToken, createOrder);

export default router;
