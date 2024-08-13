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
    // getSingleUser: builder.query({
    //     query:() =>  ({
    //         url: '/'
    //     })
    // })
  }),
});

export const { useVerifyEmailMutation, useResendVerificationCodeMutation } =
  authApi;
