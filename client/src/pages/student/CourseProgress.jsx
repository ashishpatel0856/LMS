import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { CheckCircle2, CirclePlay } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { useGetCourseProgressQuery, useUpdateLectureProgressMutation } from '@/features/api/courseProgress'
import { useParams } from 'react-router-dom'

function CourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // initialze the first lecture is not exist
  const initialLecture = currentLecture || courseDetails.lectures && courseDetails.lectures[0];

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed)
  }


  // handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  }

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({courseId,lectureId});
    refetch();
  }
  return (
    <div className='max-w-7xl mx-auto p-4 mt-20'>
      {/* display course name */}
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>{courseTitle}</h1>
        <Button>Completed</Button>
      </div>

      <div>
        {/* video section */}
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className='w-full h-auto md:rounded-lg'
              onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
              
            />
          </div>

          {/* Display current watching lecture title */}
          <div className='mt-2'>
            <h3>
              {
                `Lecture ${courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture._id)) + 1}: ${currentLecture?.lectureTiltle || initialLecture.lectureTiltle}`
              }
            </h3>
          </div>
        </div>

        {/* Lecture siderbar */}
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0'>
          <h2 className='font-semibold text-xl mb-4'>Course Lecure</h2>
          <div className='flex-1 overflow-y-auto'>
            {
              courseDetails?.lectures.map((lecture, idx) => (
                <Card
                  onClick={() => handleSelectLecture(lecture)}
                  key={lecture._id}
                   className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id ? 'bg-gray-200':'dark:bg-gray-800'} `}
                   >
                  <CardContent className='flex items-center justify-between p-4'>
                    <div className='flex items-center'>
                      {
                        isLectureCompleted(lecture._id) ? (<CheckCircle2 size={24} className='text-green-500 mr-2' />)
                          : (<CirclePlay size={24} className='text-gray-500 mr-2' />)
                      }

                      <div>
                        <CardTitle className='text-lg font-medium'>
                          {lecture.lectureTiltle}
                        </CardTitle>
                      </div>
                    </div>

                    {
                      isLectureCompleted(lecture._id) && (
                        <Badge variant={'outline'} className='bg-green-200 text-green-600'>
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

export default CourseProgress