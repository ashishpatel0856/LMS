import CreateLecture from "@/pages/admin/lecture/CreateLecture";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Creator_Course","REFETCH_LECTURE"],

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
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
    }),

    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET"
      })
    }),

    CreateLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle }
      })
    }),

    getCourseLecture: builder.query({
      query: ({ courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags:["REFETCH_LECTURE"]
    }),

    editLecture: builder.mutation({
      query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
          method:"POST",
            body:{ lectureTitle, videoInfo, isPreviewFree }
      })
    }),

    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url:`/lecture/${lectureId}`,
        method:"DELETE",
      }),
      invalidatesTags:["REFETCH_LECTURE"]
    })

  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
} = courseApi;