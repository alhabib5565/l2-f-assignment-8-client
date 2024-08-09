import { baseApi } from "./baseApi";

const productFeedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (data) => {
        return {
          url: "/feedbacks/create-feedback",
          body: data,
          method: "POST",
        };
      },
      invalidatesTags: ["feedback"],
    }),

    getAllFeedbacks: builder.query({
      query: ({ query }) => ({
        url: `/feedbacks/?${query || ""}`,
      }),
      providesTags: ["feedback"],
    }),
  }),
});

export const { useCreateFeedbackMutation, useGetAllFeedbacksQuery } =
  productFeedbackApi;
