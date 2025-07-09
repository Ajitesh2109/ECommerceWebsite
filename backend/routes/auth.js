import express from "express";
const router = express.Router();
import createUser from '../Service/registerServices.js';
import loginUser from "../Service/loginServices.js";

router.post("/register", createUser);

router.post("/login", loginUser);

export default router;
