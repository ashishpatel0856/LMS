import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    useEditCourseMutation,
    useGetCourseByIdQuery
} from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {

    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: ""
    });

    const [previewThumbnail, setPreviewThumbnail] = useState("");

    const { courseId } = useParams();
    const navigate = useNavigate();

    const { data, isLoading: loadingCourse } =
        useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});

    const course = data?.course;

    const [editCourse, { isLoading, isSuccess, error }] =
        useEditCourseMutation();

    useEffect(() => {
        if (course) {
            setInput({
                courseTitle: course.courseTitle || "",
                subTitle: course.subTitle || "",
                description: course.description || "",
                category: course.category || "",
                courseLevel: course.courseLevel || "",
                coursePrice: course.coursePrice?.toString() || "",
                courseThumbnail: ""
            });

            setPreviewThumbnail(course.courseThumbnail);
        }
    }, [course]);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    const selectCategory = (value) => {
        setInput(prev => ({ ...prev, category: value }));
    };

    const selectCourseLevel = (value) => {
        setInput(prev => ({ ...prev, courseLevel: value }));
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput(prev => ({ ...prev, courseThumbnail: file }));

            const reader = new FileReader();
            reader.onloadend = () => setPreviewThumbnail(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const updateCourseHandler = async () => {
        const formData = new FormData();

        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);

        if (input.courseThumbnail) {
            formData.append("courseThumbnail", input.courseThumbnail);
        }

        await editCourse({ formData, courseId });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Course updated successfully");
            navigate("/admin/course");
        }
        if (error) {
            toast.error(error?.data?.message || "Update failed");
        }
    }, [isSuccess, error]);

    if (loadingCourse) return <p>Loading...</p>;

    const isPublished = false;
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

            <CardContent>

                <div className='mt-4'>
                    <Label>Title</Label>
                    <Input
                        name="courseTitle"
                        value={input.courseTitle}
                        onChange={changeEventHandler}
                    />
                </div>

                <div className='mt-4'>
                    <Label>SubTitle</Label>
                    <Input
                        name="subTitle"
                        value={input.subTitle}
                        onChange={changeEventHandler}
                    />
                </div>

                <div className='mt-4'>
                    <Label>Description</Label>
                    <RichTextEditor input={input} setInput={setInput} />
                </div>

                <div className='flex gap-5 mt-5'>

                    <div>
                        <Label>Category</Label>
                        <Select value={input.category} onValueChange={selectCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Spring boot">Spring boot</SelectItem>
                                <SelectItem value="React.js">React.js</SelectItem>
                                <SelectItem value="Nodejs">Nodejs</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Course Level</Label>
                        <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Advance">Advance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* PRICE */}
                    <div>
                        <Label>Price</Label>
                        <Input
                            type="number"
                            name="coursePrice"
                            value={input.coursePrice}
                            onChange={changeEventHandler}
                        />
                    </div>

                </div>

                {/* THUMBNAIL */}
                <div className='mt-5'>
                    <Label>Thumbnail</Label>
                    <Input type="file" onChange={selectThumbnail} />

                    {previewThumbnail && (
                        <img
                            src={previewThumbnail}
                            alt="preview"
                            className="w-40 mt-2 rounded"
                        />
                    )}
                </div>

                {/* BUTTONS */}
                <div className='mt-5 flex gap-3'>
                    <Button
                        variant='outline'
                        onClick={() => navigate("/admin/course")}
                    >
                        Cancel
                    </Button>

                    <Button onClick={updateCourseHandler} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2" />
                                Saving...
                            </>
                        ) : "Save"}
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
};

export default CourseTab;



1261551964

16/08/2010