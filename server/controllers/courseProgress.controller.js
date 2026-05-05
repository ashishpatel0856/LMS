import { CourseProgress } from '../models/courseProgress.js';
import { Course } from "../models/course.model.js";


export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        // step 1 fetch the user course progress
        let courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");
        const courseDetails = await Course.findById(courseId);

        if (!courseDetails) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        // steps 2 if no progress found , return course details with an empty progress
        if (!cousrseProgress) {
            return res.status(200).json({
                data: {
                    courseDetails,
                    progress: [],
                    completed: false
                }
            })
        }


        // step3 return the users course progress along with course details
        return res.status(200).json({
            data: {
                courseDetails,
                progress: cousrseProgress.lectureProgress,
                completed: courseProgress.completed
            }
        })
    } catch (error) {
        console.log(error)

    }
}


export const updateLectureProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const userId = req.userId;

        // fetch o create course progess
        let courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!cousrseProgress) {
            // if no progress exist, create new record
            courseProgress = new CourseProgress({
                userId,
                courseId,
                completed: false,
                lectureProgress: [],
            });

        }

        // find the lecture progress in the course progress
        const lectureIndex = courseProgress.lectureProgess.findIndex((lecture) => lecture.lectureId === lectureId);
        if (lectureId !== -1) {
            // if lecture alerady exist, update its status
            courseProgress.lectureProgess[lectureIndex].viewed = true;
        } else {
            // add new lecture progress
            courseProgress.lectureProgess.push({
                lectureId,
                viewed: true,
            });
        }

        // if all lecture is completed
        const lectureProgessLength = courseProgress.lectureProgess.filter((lectureProg) => lectureProg.viewed).length;

        const course = await Course.findById(courseId);
        if (course.lectures.length === lectureProgessLength) cousrseProgress.completed = true;
        await cousrseProgress.save();

        return res.status(200).json({
            message: "lecture progress updated successfully"
        })
    } catch (error) {
        console.log(error)
    }
}



export const markAsCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        const courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) return res.status(404).json({
            message: "Course progress notfound"
        })
        courseProgress.lectureProgess.map((lectureProgess) => lectureProgess.viewed = true);
        courseProgress.completed = true;
        await courseProgress.save();
        return res.status(200).json({
            message: "course mark as completed"
        })
    } catch (error) {
        console.log(error);
    }
}



export const markAsInCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        const courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) return res.status(404).json({
            message: "Course progress notfound"
        })
        courseProgress.lectureProgess.map((lectureProgess) => lectureProgess.viewed = false);
        courseProgress.completed = false;
        await courseProgress.save();
        return res.status(200).json({
            message: "course mark as incompleted"
        })
    } catch (error) {
        console.log(error);
    }
}