import { baseApi } from "./baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalCountWithLastMonthPercentage: builder.query({
      query: () => ({
        url: "/analytics/total-count-with-last-month-percentage",
      }),
      providesTags: ["users", "feedback", "order", "product"],
    }),

    getTotalCountWithLastMonthPercentageForAUser: builder.query({
      query: () => ({
        url: "/analytics/total-count-with-last-month-percentage-for-user",
      }),
      providesTags: ["feedback", "order"],
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

    getOrderStatusOverview: builder.query({
      query: () => ({
        url: "/analytics/order-status-overview",
      }),
      providesTags: ["order"],
    }),

    getUserStatusOverview: builder.query({
      query: () => ({
        url: "/analytics/user-status-overview",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {
  useGetLastSavenDaysSalesPerDayQuery,
  useGetTotalCountWithLastMonthPercentageQuery,
  useGetTotalCountWithLastMonthPercentageForAUserQuery,
  useGetMontlyTotalSalesForAYerarQuery,
  useGetOrderStatusOverviewQuery,
  useGetUserStatusOverviewQuery,
} = analyticsApi;
