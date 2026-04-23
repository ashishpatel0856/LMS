import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";


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

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    return res.status(200).json({
      course
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id"
    });
  }
};




export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required"
      })
    };
    // create lecture
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (!course) {
  return res.status(404).json({
    message: "Course not found"
  });
}
    return res.status(201).json({
      lecture,
      message: "Lecture created successfully."
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture"
    });
  }
}



export const getCourseLecture = async (req,res) => {
  try{
    const {courseId} = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if(!course){
      return res.status(404).json({
        message: "Course not found"
      })
    }
    return res.status(200).json({
      lectures:course.lectures
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({
      message:'Failed to get lecture'
    })
  }
}