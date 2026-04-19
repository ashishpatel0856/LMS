import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const CourseTab = () => {
    const isPublished = true;
    return (
        <Card>
            <CardHeader className='flex flex-row justify-between'>
                <div>
                    <CardTitle>
                        <CardDescription>
                            Make changes to your courses here. Click save when you're done
                        </CardDescription>
                    </CardTitle>
                </div>
                <div className='space-x-2' >
                    <Button variant='outline'>
                        {
                            isPublished ? "UnPublished" : 'Public'
                        }
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export default CourseTab