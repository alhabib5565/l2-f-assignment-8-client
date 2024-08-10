import { baseApi } from "../baseApi";

const districtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDistrict: builder.query({
      query: () => ({
        url: "/districts",
      }),
    }),

    getSingleDistrict: builder.query({
      query: (id) => ({
        url: `/districts/${id}`,
      }),
    }),

    getAllDistrictFromADivision: builder.query({
      query: (id) => ({
        url: `/districts/from-a-division/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllDistrictQuery,
  useGetSingleDistrictQuery,
  useGetAllDistrictFromADivisionQuery,
} = districtApi;
