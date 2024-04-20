import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: '/products'
            })
        })
    })
})

export const { useGetAllProductsQuery } = productApi