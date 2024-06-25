import { baseApi } from "./baseApi"


const colorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createColor: builder.mutation({
            query: (data) => ({
                url: '/colors/create-color',
                body: data,
                method: "POST"
            }),
            invalidatesTags: ['color']
        }),
        getAllColors: builder.query({
            query: ({ query }) => ({
                url: `/colors?${query || ''}`,
            }),
            providesTags: ["color"]
        }),
    })
})

export const { useCreateColorMutation, useGetAllColorsQuery } = colorApi