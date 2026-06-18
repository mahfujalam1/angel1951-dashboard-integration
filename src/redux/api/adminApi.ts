import { TResponse } from "../../types/response.types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUpgradeApplications: build.query<TResponse<any>, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/users/upgrade-applications",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    getHubProviderApplications: build.query<TResponse<any>, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/users/hub-provider-applications",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    getCorporateApplications: build.query<TResponse<any>, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/users/corporate-applications",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    reviewUpgradeApplication: build.mutation<TResponse<any>, { id: string; data: { status: string; notes?: string } }>({
      query: ({ id, data }) => ({
        url: `/users/upgrade-applications/${id}/review`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    reviewHubProviderApplication: build.mutation<TResponse<any>, { id: string; data: { status: string; notes?: string } }>({
      query: ({ id, data }) => ({
        url: `/users/hub-provider-applications/${id}/review`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    reviewCorporateApplication: build.mutation<TResponse<any>, { id: string; data: { status: string; notes?: string } }>({
      query: ({ id, data }) => ({
        url: `/users/corporate-applications/${id}/review`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetUpgradeApplicationsQuery,
  useGetHubProviderApplicationsQuery,
  useGetCorporateApplicationsQuery,
  useReviewUpgradeApplicationMutation,
  useReviewHubProviderApplicationMutation,
  useReviewCorporateApplicationMutation,
} = adminApi;
