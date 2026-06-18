import { TResponse } from "@/types/response.types";
import { baseApi } from "./baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getShipmentStats: build.query<TResponse<any>, void>({
      query: () => ({
        url: "/shipments/stats",
        method: "GET",
      }),
    }),
    getDashboardRequests: build.query<TResponse<any>, void>({
      query: () => ({
        url: "/dashboard/requests",
        method: "GET",
      }),
    }),
    getGrowthStats: build.query<TResponse<any>, void>({
      query: () => ({
        url: "/dashboard/growth-stats",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetShipmentStatsQuery,
  useGetDashboardRequestsQuery,
  useGetGrowthStatsQuery,
} = statsApi;
