import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrands: builder.query({
            query: () => ({
                url: '/brands'
            })
        })
    })
})

export const { useGetAllBrandsQuery } = brandApi