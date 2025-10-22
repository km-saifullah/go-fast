import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import { createCatedory } from "../controllers/category.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const router = Router();

router.route("/").post(isLoggedIn, isAdmin, createCatedory);

export default router;
