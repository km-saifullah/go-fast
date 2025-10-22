import express from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

router.route("/").get(isLoggedIn, isAdmin, getAllUsers);
router.route("/:id").get(isLoggedIn, getSingleUser);

export default router;
