import { baseApi } from "../baseApi";


const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/categories/create-category',
                body: data,
                method: "POST"
            }),
            invalidatesTags: ['category']
        }),
        getCategories: builder.query({
            query: ({ query }) => ({
                url: `/categories?${query || ''}`,
            }),
            providesTags: ["category"]
        }),
    })
})

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi