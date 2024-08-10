import { baseApi } from "../baseApi";

const upazilaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUpazila: builder.query({
      query: () => ({
        url: "/upazilas",
      }),
    }),

    getSingleUpazila: builder.query({
      query: (id) => ({
        url: `/upazilas/${id}`,
      }),
    }),

    getAllUpazilaFromADistrict: builder.query({
      query: (id) => ({
        url: `/upazilas/from-a-districts/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllUpazilaQuery,
  useGetSingleUpazilaQuery,
  useGetAllUpazilaFromADistrictQuery,
} = upazilaApi;
