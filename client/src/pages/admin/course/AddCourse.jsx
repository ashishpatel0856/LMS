import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'

const AddCourse = () => {
  const [courseTitle,setCourseTitle] = useState("");
  const [category,setCotegory] = useState("");
  const [createCourse,{data,isLoading,error,isSuccess}] = useCreateCourseMutation();
  const navigate= useNavigate();
  
  const getSelectCotegory = (value) => {
        setCotegory(value);
  }

  const createCourseHandler = async () => {
    await createCourse({courseTitle,category})
  };

  // for displaing toast
  useEffect(() =>{
    if(isSuccess){
      toast.success(data?.message || "Course created");
      navigate("/admin/course");
    }
  },[isSuccess,error]);

  
  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'>Lets add course , add some informations for your new Course</h1>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam incidunt molestias nemo quod libero sapiente dolorum iste neque odit? Impedit quam ea saepe delectus ullam mollitia? Corrupti consectetur aspernatur assumenda!</p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Title</Label>
          <Input
            type='text'
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>

        <div>
          <Label>Category</Label>



          <Select onValueChange = {getSelectCotegory} >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="apple">Spring boot</SelectItem>
                <SelectItem value="banana">React.js</SelectItem>
                <SelectItem value="blueberry">Nodejs</SelectItem>
                <SelectItem value="grapes">Data Science</SelectItem>
                <SelectItem value="pineapple">Machine Learning</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>


        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={() => navigate("/admin/course")} >Back</Button>
          <Button disabled={isLoading} onClick={createCourseHandler} >
            {
              isLoading ? (
                <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                Please wait...
                </>
              ): "Create"
            }
          </Button>
        </div>

      </div>
    </div>
  )
}

export default AddCourse