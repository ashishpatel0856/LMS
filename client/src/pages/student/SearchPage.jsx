import React from 'react'
import Filter from './Filter'
import SearchResult from './SearchResult';

const SearchPage = () => {
    const isLoading = false;
    const isEmpty = false;
    return (
        <div className='max-w-7xl mx-auto p-4 md:p-8'>
            <div className='my-6'>
                <h1>result for html</h1>
                <p>Showing results for {" "}
                    <span className='text-blue-800 font-bold italic'>Frontend developer</span>
                </p>
            </div>
            <div className='flex flex-col md:flex-row gap-10'>
                <Filter />
                <div className='flex-1'>
                    {
                        isLoading ? (
                            Array.from({ length: 3 }).map((_, idx) => (
                                <CourseSkeleton key={idx} />
                            ))
                        ) : isEmpty ? (<CourseNotFound />) : (
                            [1, 2, 3].map((_, idx) => (
                                <SearchResult key={idx} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage


const CourseSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4">
          
          {/* Image */}
          <div className="w-20 h-20 bg-gray-300 rounded"></div>

          {/* Text */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>

        </div>
      ))}
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      
      {/* Icon */}
      <div className="text-6xl mb-4">📚</div>

      {/* Heading */}
      <h2 className="text-xl font-semibold mb-2">
        No Courses Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 mb-4">
        Try searching with a different keyword or check your spelling.
      </p>

      {/* Button */}
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Search
      </button>

    </div>
  );
};