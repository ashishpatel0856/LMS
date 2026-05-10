import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      
      {/* Left Section */}
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col sm:flex-row gap-4 w-full"
      >
        {/* Thumbnail */}
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-44 sm:h-36 md:h-32 w-full sm:w-48 md:w-56 object-cover rounded-lg"
        />

        {/* Course Details */}
        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-2">
            <h1 className="font-bold text-lg sm:text-xl line-clamp-2">
              {course.courseTitle}
            </h1>

            <p className="text-sm text-gray-600 line-clamp-2">
              {course.subTitle}
            </p>

            <p className="text-sm text-gray-700">
              By{" "}
              <span className="font-semibold">
                {course.creator?.name || "Ashish Patel"}
              </span>
            </p>

            <Badge className="w-fit mt-1">
              {course.courseLevel}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Price Section */}
      <div className="w-full lg:w-auto flex lg:block justify-between items-center mt-2 lg:mt-0">
        <h1 className="font-bold text-xl text-primary">
          ₹ {course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;