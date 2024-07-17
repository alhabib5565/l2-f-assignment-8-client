import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["product"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["product"],
    }),
    addToFlashSale: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/add-flash-sale/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useAddToFlashSaleMutation,
} = productApi;
