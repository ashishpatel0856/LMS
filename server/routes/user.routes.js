import express from "express";
import { register,login, getUserProfile,logout, updatedProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated,getUserProfile);
router.route("/profile/update").put(isAuthenticated,updatedProfile);

export default router;