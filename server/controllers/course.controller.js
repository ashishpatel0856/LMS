import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteVideoFromCloudinary } from "../utils/cloudinary.js";


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
        message: "Lecture title and courseId are required"
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    //  create lecture WITH course reference
    const lecture = await Lecture.create({
      lectureTitle,
      course: courseId
    });

    //  push lecture into course
    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully."
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture"
    });
  }
};



export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      })
    }
    return res.status(200).json({
      lectures: course.lectures
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to get lecture'
    })
  }
}


export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found"
      });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if(videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    // if(isPreviewFree) 
      lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully"
    });

  } catch (error) {
    console.log(error); 
    res.status(500).json({
      success: false,
      message: "Failed to edit lectures"
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).josn({
        message: "Lecture not found"
      });
    }
    //delete lecture from cloudinory
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    // remove the lecture  reference from the associated course
    await Course.updateOne(
      { lectures: lectureId }, // find the course that contains the lecture
      { $pull: { lectures: lectureId } } // remove the lectures id form the lecture array
    );

    return res.status(200).josn({
      message: "Lecture delete successfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).josn({
      message: "Failed to remove lecture."
    })
  }
}


export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).josn({
        message: "Lecture not found"
      });
    }
    return res.status(200).json({
      lecture
    })
  } catch {
    console.log(error);
    return res.status(500).josn({
      message: "Failed to get lecture by id."
    })
  }
}


// public or unpublic course logic

export  const togglePublishCourse = async (req,res) => {
  try {
    const {courseId} = req.params;
    const {publish} = req.query; // true,false
    const course = await Course.findById(courseId)
    if(!course) {
      return res.status(404).json({
        message:"course not found."
      });
    }
    // public status based on the query parameter
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published":"Unpublished";
    return res.status(200).json({
      message:`Course is ${statusMessage}`
    });
  } catch (error) {
     console.log(error);
     return res.status(500).json({
      message:"Failed to public or unpublic status"
     })
  }
}