import { baseApi } from "../baseApi";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivision: builder.query({
      query: () => ({
        url: "/divisions",
      }),
    }),
    getSingleDivision: builder.query({
      query: (id) => ({
        url: `/divisions/${id}`,
      }),
    }),
  }),
});

export const { useGetAllDivisionQuery, useGetSingleDivisionQuery } =
  divisionApi;
