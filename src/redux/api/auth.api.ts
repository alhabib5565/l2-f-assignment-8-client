import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        body: data,
        method: "POST",
      }),
    }),

    resendVerificationCode: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-verification-code",
        body: data,
        method: "POST",
      }),
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

export const {
  useVerifyEmailMutation,
  useResendVerificationCodeMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} = authApi;
