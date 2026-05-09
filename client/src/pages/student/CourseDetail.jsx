// import BuyCourseButton from '@/components/BuyCourseButton'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Separator } from '@/components/ui/separator'
// import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi'
// import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
// import React from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import ReactPlayer from "react-player";
// const CourseDetail = () => {
//     const params = useParams();
//     const courseId = params.courseId;

//     const navigate = useNavigate(); 

//     const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

//     if (isLoading) return <h1>Loading....</h1>;
//     if (isError) return <h1>failed to load course details</h1>;

//     const { course, purchased } = data;

//     const handleContinueCourse = () => {
//         if (purchased) {
//             navigate(`/course-progress/${courseId}`);
//         }
//     };

//     return (
//         <div className='m-20 space-y-5'>
//             <div className='bg-[#2D2F31] text-white'>
//                 <div className='max-w-7xl max-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
//                     <h1 className='font-bold text-2xl md:text-3xl'>{course?.courseTitle}</h1>
//                     <p className='text-base md:text-lg'>Course Sub-title</p>
//                     <p>Created By{" "} <span className='tex-[#C0C4FC] underline italic'>{course?.creator?.name}</span></p>
//                     <div className='flex items-center gap-2 text-sm'>
//                         <BadgeInfo size={16} />
//                         <p>
//                             Last updated {course?.createdAt?.split("T")[0]}
//                         </p>                    </div>
//                     <p>Students enrolled: {course?.enrolledStudents?.length}</p>
//                 </div>
//             </div>
//             <div className='max-w-7xl mx-auto my-5 px4 md:px-8 flex flex-col lg:flex-row justify-between'>
//                 <div className='w-full lg:w-1/2 space-y-5'>
//                     <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
//                     <p className='text-sm' dangerouslySetInnerHTML={{ __html: course.description }} />
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>
//                                 <CardDescription>
//                                     4 lectures
//                                 </CardDescription>
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent className='space-y-3'>
//                             {
//                                 course.lectures.map((lecture, idx) => (
//                                     <div key={idx} className='flex items-center gap-3 text-sm'>
//                                         <span>
//                                             {
//                                                 true ? (<PlayCircle size={14} />) : <Lock size={14} />
//                                             }
//                                         </span>
//                                         <p>{lecture.lectureTitle}</p>
//                                     </div>
//                                 ))
//                             }
//                         </CardContent>
//                     </Card>
//                 </div>
//                 <div className='w-full lg:w-1/3'>
//                     <Card>
//                         <CardContent className="p-4 flex flex-col">
//                             <div className='w-full aspect-video mb-4'>
//                                 <ReactPlayer
//                                     width="100%"
//                                     height={"100%"}
//                                     url={course.lectures[0].videoUrl}
//                                     controls={true}
//                                 />

//                             </div>
//                             <h1>Lecture title</h1>
//                             <Separator className='my-2' />
//                             <h1 className='text-lg md:text-xl font-semibold'>Course Price</h1>

//                         </CardContent>
//                         <CardFooter className='flex justify-center p-4'>
//                             {
//                                 purchased ? (
//                                     <Button onClick={handleContinueCourse} className='w-full'>Continue Course</Button>
//                                 ) : (
//                                     <BuyCourseButton courseId={courseId} />
//                                 )

//                             }
//                         </CardFooter>

//                     </Card>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default CourseDetail




import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi'
import { BadgeInfo, Lock, PlayCircle, Users, Calendar, Clock, Star, CheckCircle } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from "react-player";

const CourseDetail = () => {
    const params = useParams();
    const courseId = params.courseId;

    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (isError) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-red-500 mb-2">Failed to load course details</h1>
                <p className="text-gray-500">Please try again later</p>
            </div>
        </div>
    );

    const { course, purchased } = data;

    const handleContinueCourse = () => {
        if (purchased) {
            navigate(`/course-progress/${courseId}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
                <div className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
                        {/* Left Content */}
                        <div className="flex-1 max-w-3xl">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                                <span className="hover:text-white cursor-pointer transition-colors">Courses</span>
                                <span>/</span>
                                <span className="text-gray-300">{course?.courseTitle}</span>
                            </div>

                            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4">
                                {course?.courseTitle}
                            </h1>

                            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                                {course?.subTitle || "Master the skills you need with expert-led training"}
                            </p>

                            {/* Creator */}
                            <div className="flex items-center gap-3 mb-4 sm:mb-5">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {course?.creator?.name?.charAt(0)?.toUpperCase() || "I"}
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-400">Created by</p>
                                    <p className="text-sm sm:text-base font-semibold text-[#C0C4FC] hover:underline cursor-pointer">
                                        {course?.creator?.name || "Instructor"}
                                    </p>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <BadgeInfo size={14} className="flex-shrink-0" />
                                    <span>Last updated {course?.createdAt?.split("T")[0]}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users size={14} className="flex-shrink-0" />
                                    <span>{course?.enrolledStudents?.length || 0} students enrolled</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} className="flex-shrink-0" />
                                    <span>{course?.lectures?.length || 0} lectures</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Star size={14} className="text-yellow-400 flex-shrink-0" />
                                    <span>4.8 (2.5k reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Card - Desktop Only */}
                        <div className="hidden lg:block w-[340px] xl:w-[380px] flex-shrink-0">
                            <CoursePurchaseCard 
                                course={course} 
                                courseId={courseId} 
                                purchased={purchased}
                                handleContinueCourse={handleContinueCourse}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* Left Column */}
                    <div className="flex-1 max-w-3xl">
                        {/* Mobile Purchase Card */}
                        <div className="lg:hidden mb-6">
                            <CoursePurchaseCard 
                                course={course} 
                                courseId={courseId} 
                                purchased={purchased}
                                handleContinueCourse={handleContinueCourse}
                            />
                        </div>

                        {/* What You'll Learn */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 dark:border-gray-800 mb-6 sm:mb-8">
                            <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white mb-4 sm:mb-5">
                                What you'll learn
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    "Build real-world projects from scratch",
                                    "Master industry best practices",
                                    "Get hands-on coding experience",
                                    "Earn a certificate of completion"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5">
                                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 sm:mb-8">
                            <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white mb-3 sm:mb-4">
                                Description
                            </h2>
                            <div 
                                className="prose dark:prose-invert prose-sm sm:prose-base max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: course?.description }} 
                            />
                        </div>

                        {/* Course Content */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
                                <h2 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                                    Course Content
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {course?.lectures?.length || 0} lectures
                                </p>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {course?.lectures?.map((lecture, idx) => (
                                    <div 
                                        key={idx} 
                                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            {purchased ? (
                                                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                    <PlayCircle size={16} className="text-blue-600 dark:text-blue-400" />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                                    <Lock size={14} className="text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                                                {lecture.lectureTitle}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                Lecture {idx + 1}
                                            </p>
                                        </div>
                                        {purchased && (
                                            <span className="text-xs text-green-600 dark:text-green-400 font-medium flex-shrink-0">
                                                Free
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block w-[340px] xl:w-[380px] flex-shrink-0">
                        {/* Spacer for alignment */}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Purchase Card Component
const CoursePurchaseCard = ({ course, courseId, purchased, handleContinueCourse }) => {
    return (
        <Card className="overflow-hidden shadow-xl border-0 bg-white dark:bg-gray-900">
            {/* Video Preview */}
            <div className="relative aspect-video bg-black">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    url={course?.lectures?.[0]?.videoUrl}
                    controls={true}
                    light={true}
                    playIcon={
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <PlayCircle size={32} className="text-blue-600 ml-1" />
                        </div>
                    }
                />
            </div>

            <CardContent className="p-4 sm:p-5">
                {/* Price */}
                <div className="mb-3 sm:mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        ₹{course?.coursePrice || "999"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-400 line-through">₹{Math.round((course?.coursePrice || 999) * 1.5)}</span>
                        <BadgeInfo size={14} className="text-green-500" />
                        <span className="text-sm text-green-600 font-medium">33% off</span>
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-4 sm:mb-5">
                    <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={16} className="flex-shrink-0" />
                        <span>{course?.lectures?.length || 0} lectures</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <Users size={16} className="flex-shrink-0" />
                        <span>{course?.enrolledStudents?.length || 0} students enrolled</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar size={16} className="flex-shrink-0" />
                        <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <Star size={16} className="flex-shrink-0" />
                        <span>Certificate of completion</span>
                    </div>
                </div>

                <Separator className="my-4" />

                {/* CTA Button */}
                {purchased ? (
                    <Button 
                        onClick={handleContinueCourse} 
                        className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold bg-green-600 hover:bg-green-700 text-white"
                    >
                        <PlayCircle size={18} className="mr-2" />
                        Continue Course
                    </Button>
                ) : (
                    <BuyCourseButton courseId={courseId} />
                )}

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                    30-Day Money-Back Guarantee
                </p>
            </CardContent>
        </Card>
    );
};

export default CourseDetail