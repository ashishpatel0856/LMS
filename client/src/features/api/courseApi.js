import CreateLecture from "@/pages/admin/lecture/CreateLecture";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Creator_Course"],

  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({

    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Creator_Course"],
    }),

    getCreatorCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Creator_Course"],
    }),


    editCourse: builder.mutation({
      query: ({formData,courseId}) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
           formData: true,
      }),
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method:"GET"
      })
    }),

    CreateLecture:builder.mutation({
      query: ({lectureTitle,courseId}) => ({
        url:`/${courseId}/lecture`,
        method:"POST",
        body:{lectureTitle}
      })
    }),

      getCourseLecture:builder.query({
      query: ({courseId}) => ({
        url:`/${courseId}/lecture`,
        method:"GET",
      })
    }),

  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} = courseApi;