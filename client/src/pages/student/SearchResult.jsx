import { Badge } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({ course }) => {
    const courseId = "adse"
    return (
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-gray-300 gap-4 '>
            <Link to={`/course-details/${courseId}`} className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
                <img
                    src={"https://imgs.search.brave.com/PHc6RCkw9Hl4Orf5mV4KNVrjvJBAvSJvKuTopYI3xWo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG5i/bG9nLndlYmt1bC5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wMi9u/ZXh0LWpzLWltYWdl/LWNvbXBvbmVudC5w/bmc"}
                    alt='course-thumbnail'
                    className='h-32 w-full md:w-56 object-cover rounded '
                />

                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-lg md:text-xl'>Course title</h1>
                    <p className='text-sm text-gray-600'>SubTitle</p>
                    <p className='text-sm text-gray-700'>Instructor: <span className='font-bold'>Ashish patel</span></p>
                    <Badge className='w-fit mt-2 md:mt-0'>Medium</Badge>
                </div>

            </Link>
        </div>
    )
}

export default SearchResult