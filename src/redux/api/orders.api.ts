import { baseApi } from "./baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ query }) => ({
        url: `/orders?${query || ""}`,
      }),
      providesTags: ["order"],
    }),

    getSingleOrder: builder.query({
      query: ({ id }) => ({
        url: `/orders/${id}`,
      }),
      providesTags: ["order"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} = ordersApi;
