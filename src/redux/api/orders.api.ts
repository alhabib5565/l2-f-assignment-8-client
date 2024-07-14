import { baseApi } from "./baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ query }) => ({
        url: `/orders?${query || ""}`,
      }),
    }),

    getSingleOrder: builder.query({
      query: ({ id }) => ({
        url: `/orders/${id}`,
      }),
    }),

    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} = ordersApi;
