import { baseApi } from "../baseApi";


const mainCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMainCategory: builder.mutation({
            query: (data) => ({
                url: '/main-categories/create-main-category',
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["main-category"]
        }),
        getMainCategories: builder.query({
            query: ({ query }) => ({
                url: `/main-categories?${query || ''}`,
            }),
            providesTags: ['main-category']
        }),
    })
})

export const { useCreateMainCategoryMutation, useGetMainCategoriesQuery } = mainCategoryApi