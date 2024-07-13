import { baseApi } from "../baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "/sub-categories/create-sub-category",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["sub-category"],
    }),
    getSubCategories: builder.query({
      query: ({ query }) => ({
        url: `/sub-categories?${query || ""}`,
      }),
      providesTags: ["sub-category"],
    }),
  }),
});

export const { useCreateSubCategoryMutation, useGetSubCategoriesQuery } =
  subCategoryApi;
