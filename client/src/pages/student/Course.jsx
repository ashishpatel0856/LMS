import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Course = () => {
    return (
        <div>
            <Card className="overflow-hidden rounded-lg dark:bg-red-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className='relative'>
                    <img
                        className='w-full h-36 object-cover rounded-t-lg'
                        src="https://t4.ftcdn.net/jpg/02/93/50/51/360_F_293505190_QACuhlzI4WXOeznVC59LLb2yUcQbf3xv.jpg"
                        alt="courses"
                    />
                </div>

                <CardContent className='px-5 py-4 space-y-3'>
                    <h1 className="hover:underline font-bold text-lg truncate">Nextjs complete course in hindi and english 2026</h1>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <Avatar className='h-8 w-8'>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                            </Avatar>

                            <h1 className='font-medium text-sm'>Patel MernStack</h1>
                        </div>
                        <Badge className='bg-blue-600 text-white px-4 py-4 text-xs rounded-full '>Advanced</Badge>
                    </div>

                    <div className='text-lg font-bold'>
                        <span >Rs499</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Course