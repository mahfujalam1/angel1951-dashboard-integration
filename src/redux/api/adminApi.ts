import {
  UpdateCorporateApplicationPayload,
  UpdateHubProviderApplicationPayload,
  UpdateUpgradeApplicationPayload,
} from "../../types/application.types";
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
    getUpgradeApplicationById: build.query<TResponse<any>, string>({
      query: (id) => ({
        url: `/users/upgrade-applications/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: tagTypes.users, id }],
    }),
    getHubProviderApplications: build.query<TResponse<any>, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/users/hub-provider-applications",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    getHubProviderApplicationById: build.query<TResponse<any>, string>({
      query: (id) => ({
        url: `/users/hub-provider-applications/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: tagTypes.users, id }],
    }),
    getCorporateApplications: build.query<TResponse<any>, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/users/corporate-applications",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    getCorporateApplicationById: build.query<TResponse<any>, string>({
      query: (id) => ({
        url: `/users/corporate-applications/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: tagTypes.users, id }],
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
    updateUpgradeApplication: build.mutation<
      TResponse<any>,
      { id: string; data: UpdateUpgradeApplicationPayload }
    >({
      query: ({ id, data }) => ({
        url: `/users/upgrade-applications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [tagTypes.users, { type: tagTypes.users, id }],
    }),
    updateHubProviderApplication: build.mutation<
      TResponse<any>,
      { id: string; data: UpdateHubProviderApplicationPayload }
    >({
      query: ({ id, data }) => ({
        url: `/users/hub-provider-applications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [tagTypes.users, { type: tagTypes.users, id }],
    }),
    updateCorporateApplication: build.mutation<
      TResponse<any>,
      { id: string; data: UpdateCorporateApplicationPayload }
    >({
      query: ({ id, data }) => ({
        url: `/users/corporate-applications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [tagTypes.users, { type: tagTypes.users, id }],
    }),
  }),
});

export const {
  useGetUpgradeApplicationsQuery,
  useGetUpgradeApplicationByIdQuery,
  useGetHubProviderApplicationsQuery,
  useGetHubProviderApplicationByIdQuery,
  useGetCorporateApplicationsQuery,
  useGetCorporateApplicationByIdQuery,
  useReviewUpgradeApplicationMutation,
  useReviewHubProviderApplicationMutation,
  useReviewCorporateApplicationMutation,
  useUpdateUpgradeApplicationMutation,
  useUpdateHubProviderApplicationMutation,
  useUpdateCorporateApplicationMutation,
} = adminApi;
