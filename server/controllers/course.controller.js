import { Course } from "../models/course.model.js";


export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category is required."
      })
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id
    });
    return res.status(201).json({
      message: "Course created successfully",
      success: true,
      course
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
      success: false
    })
  }
}


export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;

    const courses = await Course.find({ creator: userId });

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get courses",
    });
  }
};