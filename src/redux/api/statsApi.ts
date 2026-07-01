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
    getAdminDashboardStats: build.query<TResponse<any>, { year?: number } | void>({
      query: (params) => ({
        url: "/admin/dashboard/stats",
        method: "GET",
        params: params || undefined,
      }),
    }),
  }),
});

export const {
  useGetShipmentStatsQuery,
  useGetDashboardRequestsQuery,
  useGetGrowthStatsQuery,
  useGetAdminDashboardStatsQuery,
} = statsApi;
