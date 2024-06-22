import { baseApi } from "../baseApi";


const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/categories/create-category',
                body: data,
                method: "POST"
            }),
            invalidatesTags: ['main-category']
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/categories',
            }),
            providesTags: ["category"]
        }),
    })
})

export const { useCreateCategoryMutation } = categoryApi