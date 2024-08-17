import { baseApi } from "./baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalCountWithLastMonthPercentage: builder.query({
      query: () => ({
        url: "/analytics/total-count-with-last-month-percentage",
      }),
      providesTags: ["users", "feedback", "order", "product"],
    }),

    getLastSavenDaysSalesPerDay: builder.query({
      query: () => ({
        url: "/analytics/last-saven-days-total-sales",
      }),
      providesTags: ["order"],
    }),

    getMontlyTotalSalesForAYerar: builder.query({
      query: () => ({
        url: "/analytics/total-sale-per-month-for-a-year",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useGetLastSavenDaysSalesPerDayQuery,
  useGetTotalCountWithLastMonthPercentageQuery,
  useGetMontlyTotalSalesForAYerarQuery,
} = analyticsApi;
