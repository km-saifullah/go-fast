import express from "express";
import { signupUser } from "../controllers/auth.controller";

const router = express.Router();

router.route("/signup").post(signupUser);

export default router;
