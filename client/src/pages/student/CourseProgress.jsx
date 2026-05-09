import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/features/api/courseProgress';
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function CourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [completeCourse, { data: markedCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();

  const [inCompleteCourse, { data: markedInCompleteData, isSuccess: inCompleteSuccess }] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess && markedCompleteData) {
      refetch();
      toast.success(markedCompleteData.message);
    }

    if (inCompleteSuccess && markedInCompleteData) {
      refetch();
      toast.success(markedInCompleteData.message);
    }
  }, [completedSuccess, inCompleteSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  console.log(data);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen mt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center min-h-screen mt-20">
      <p className="text-red-500 text-lg">Failed to load course details</p>
    </div>
  );

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // initialze the first lecture is not exist
  const initialLecture = currentLecture || courseDetails.lectures && courseDetails.lectures[0];

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed)
  }

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  }

  // handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  }

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* display course name */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
          {courseTitle}
        </h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className={`w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base ${
            completed 
              ? 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> 
              <span>Completed</span>
            </div>
          ) : (
            <span>Mark as Completed</span>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* video section */}
        <div className="flex-1 lg:w-3/5 h-fit rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="relative aspect-video bg-black rounded-lg sm:rounded-xl overflow-hidden">
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
              onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
            />
          </div>

          {/* Display current watching lecture title */}
          <div className="mt-3 sm:mt-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white leading-snug">
              {
                `Lecture ${courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture._id)) + 1}: ${currentLecture?.lectureTiltle || initialLecture.lectureTiltle}`
              }
            </h3>
          </div>
        </div>

        {/* Lecture siderbar */}
        <div className="flex flex-col w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 pt-4 lg:pt-0 lg:pl-4">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Course Lectures
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[500px] lg:max-h-[calc(100vh-250px)]">
            {
              courseDetails?.lectures.map((lecture) => (
                <Card
                  onClick={() => handleSelectLecture(lecture)}
                  key={lecture._id}
                  className={`mb-2 sm:mb-3 hover:cursor-pointer transition-all duration-200 hover:shadow-md ${
                    lecture._id === (currentLecture?._id || initialLecture._id) 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700' 
                      : 'dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <CardContent className="flex items-center justify-between p-3 sm:p-4">
                    <div className="flex items-center min-w-0">
                      {
                        isLectureCompleted(lecture._id) 
                          ? (<CheckCircle2 size={20} className="text-green-500 mr-2 sm:mr-3 flex-shrink-0" />)
                          : (<CirclePlay size={20} className="text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />)
                      }

                      <div className="min-w-0">
                        <CardTitle className="text-sm sm:text-base font-medium truncate text-gray-900 dark:text-white">
                          {lecture.lectureTiltle}
                        </CardTitle>
                      </div>
                    </div>

                    {
                      isLectureCompleted(lecture._id) && (
                        <Badge variant={'outline'} className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700 text-xs flex-shrink-0 ml-2">
                          completed
                        </Badge>
                      )
                    }

                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress;