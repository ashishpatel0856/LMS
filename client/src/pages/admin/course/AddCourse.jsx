import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
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

const AddCourse = () => {
  const navigate= useNavigate()
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
            name="courseTitle"
            placeholder="Your Course Name"
          />
        </div>

        <div>
          <Label>Category</Label>



          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>


        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={() => navigate()} >Back</Button>
          <Button>Create</Button>
        </div>

      </div>
    </div>
  )
}

export default AddCourse