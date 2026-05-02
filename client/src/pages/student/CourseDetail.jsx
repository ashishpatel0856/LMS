import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'

const CourseDetail = () => {
    const purchaseCourse = false;
    return (
        <div className='m-20 space-y-5'>
            <div className='bg-[#2D2F31] text-white'>
                <div className='max-w-7xl max-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
                    <p className='text-base md:text-lg'>Course Sub-title</p>
                    <p>Created By{" "} <span className='tex-[#C0C4FC] underline italic'>patel mernstack</span></p>
                    <div className='flex items-center gap-2 text-sm'>
                        <BadgeInfo size={16} />
                        <p>Last updated 11-11-2026</p>
                    </div>
                    <p>Students enrolled: 10</p>
                </div>
            </div>
            <div className='max-w-7xl mx-auto my-5 px4 md:px-8 flex flex-col lg:flex-row justify-between'>
                <div className='w-full lg:w-1/2 space-y-5'>
                    <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
                    <p>Learn how to create a Fullstack LMS  App from scratch using ReactJS, Express, NodeJS and MongoDB.  This project is perfect for those looking to enhance their skills in web development and add a valuable project to their portfolio. Stay tuned for more exciting updates in future parts!</p>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <CardDescription>
                                    4 lectures
                                </CardDescription>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {
                                [1, 2, 3].map((lecture, idx) => (
                                    <div key={idx} className='flex items-center gap-3 text-sm'>
                                        <span>
                                            {
                                                true ? (<PlayCircle size={14} />) : <Lock size={14} />
                                            }
                                        </span>
                                        <p>Lecture Title</p>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>
                <div className='w-full lg:w-1/3'>
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <div className='w-full aspect-video mb-4'>
                                Video ayeega

                            </div>
                            <h1>Lecture title</h1>
                            <Separator className='my-2' />
                            <h1 className='text-lg md:text-xl font-semibold'>Course Price</h1>

                        </CardContent>
                        <CardFooter className='flex justify-center p-4'>
                            {
                                purchaseCourse ? (
                                    <Button className='w-full'>Continue Course</Button>
                                ) : (
                                    <BuyCourseButton/>
                                )

                            }
                        </CardFooter>

                    </Card>
                </div>
            </div>
        </div >
    )
}

export default CourseDetail