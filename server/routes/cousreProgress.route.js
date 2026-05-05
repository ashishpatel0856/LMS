import express, { Router } from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/courseProgress.controller";

const router = express.Router();


router.route("/:courseId").get(isAuthenticated,getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticated,updateLectureProgress);
router.route("/:courseId/completed").post(isAuthenticated,markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated,markAsInCompleted);

export default router;