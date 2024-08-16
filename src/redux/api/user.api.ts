import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/getMe/me",
      }),
      providesTags: ["users"],
    }),

    getAllUser: builder.query({
      query: ({ query }) => ({
        url: `/users?${query || ""}`,
      }),
      providesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/${id || ""}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateUserMutation, useGetAllUserQuery } =
  userApi;
