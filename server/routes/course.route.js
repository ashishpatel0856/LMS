import express from "express";
import { register,login, getUserProfile,logout, updatedProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getCreatorCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);
export default router;