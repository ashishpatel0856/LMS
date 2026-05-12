import React from 'react'
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';
import { BookOpen, GraduationCap } from 'lucide-react';

const MyLearning = () => {

  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user?.enrolledCourses || [];

  console.log("MyLearning Data:", data);           
  console.log("MyLearning Courses:", myLearning);    

  return (
    <div className='max-w-7xl mx-auto my-24 px-4 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
          <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        <div>
          <h1 className='font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white'>My Learning</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {myLearning.length} {myLearning.length === 1 ? 'course' : 'courses'} enrolled
          </p>
        </div>
      </div>

      <div className='my-5'>
        {
          isLoading ? (
            <MyLearningSkeleton />
          ) : myLearning.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={32} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No courses yet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                You haven't enrolled in any courses yet. Browse our catalog and start learning today!
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
              {
                myLearning.map((course, index) => (
                  <Course key={course._id || index} course={course} />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MyLearning


const MyLearningSkeleton = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className='bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden'
      >
        {/* Thumbnail skeleton */}
        <div className='h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 animate-pulse' />

        {/* Content skeleton */}
        <div className='p-4 space-y-3'>
          <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4' />
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2' />
          <div className='flex items-center gap-2 pt-2'>
            <div className='h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24' />
          </div>
        </div>
      </div>
    ))}
  </div>
);