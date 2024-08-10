import { baseApi } from "../baseApi";

const unionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnion: builder.query({
      query: () => ({
        url: "/unions",
      }),
    }),

    getSingleUnion: builder.query({
      query: (id) => ({
        url: `/unions/${id}`,
      }),
    }),

    getAllUnionFromAUnion: builder.query({
      query: (id) => ({
        url: `/unions/from-a-upazilla/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllUnionQuery,
  useGetSingleUnionQuery,
  useGetAllUnionFromAUnionQuery,
} = unionApi;
