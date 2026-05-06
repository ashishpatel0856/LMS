import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React from 'react'

  const categories = [
        { id: "nextjs", level: "Next Js" },
        { id: "react", level: "React Js" },
        { id: "node", level: "Node Js" },
        { id: "mongodb", level: "MongoDB" },
        { id: "express", level: "Express Js" },
        { id: "javascript", level: "JavaScript" },
        { id: "typescript", level: "TypeScript" },
        { id: "html", level: "HTML" },
        { id: "css", level: "CSS" },
        { id: "tailwind", level: "Tailwind CSS" },
        { id: "bootstrap", level: "Bootstrap" },
        { id: "redux", level: "Redux" },
        { id: "graphql", level: "GraphQL" },
        { id: "restapi", level: "REST API" },
        { id: "firebase", level: "Firebase" },
        { id: "docker", level: "Docker" },
        { id: "kubernetes", level: "Kubernetes" },
        { id: "aws", level: "AWS" },
        { id: "git", level: "Git" },
        { id: "github", level: "GitHub" }
    ];
const Filter = () => {
    const handleCategoryChange =(categoryId) => {

    }
  

    
    return (
        <div className='w-full md:w-[20%]'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold text-lg md:text-xl'>Filter Options</h1>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholde="sort by" />
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort by price</SelectLabel>
                                <SelectItem value="low">Low to High</SelectItem>
                                <SelectItem value="high">High to Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectTrigger>
                </Select>
            </div>

            <Separator className='my-4' />
            <div className=''>
                <h1 className='font-bold mb-2'>Category</h1>
                {
                    categories.map((cat) => (
  <div key={cat.id} className='flex items-center space-x-2 my-2'>
    <Checkbox
      id={cat.id}
      onCheckedChange={() => handleCategoryChange(cat.id)}
    />
    <Label className='text-sm font-medium leading-none'>
      {cat.level}
    </Label>
  </div>
))
                }
            </div>
        </div>
    )
}

export default Filter