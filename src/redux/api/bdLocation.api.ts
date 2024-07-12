import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bdLocationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://bdapis.com/api/v1.2",
  }),
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: () => ({
        url: "/divisions",
        mode: "no-cors",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDivisionsQuery } = bdLocationApi;

/**
 *     endpoints: (builder) => ({
        getDivisions : builder.query({
            query: () => ({
                url: ''
            })
        })
    })
 */
