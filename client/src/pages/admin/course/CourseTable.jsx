import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCreatorCourseQuery();

  console.log("data:", data);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong</h1>;

  return (
    <div>
      <Button onClick={() => navigate(`create`)}>
        Create a new Course
      </Button>

      <Table>
        <TableCaption>A list of your courses.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.courses?.length > 0 ? (
            data.courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  {course?.coursePrice || "NA"}
                </TableCell>

                <TableCell>
                  {course.isPublished ? "Published" : "Draft"}
                </TableCell>

                <TableCell>{course.courseTitle}</TableCell>

                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => navigate(`${course._id}`)} >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                No courses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;