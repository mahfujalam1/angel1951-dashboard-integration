import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { TResponse } from "../../types/response.types";

export const branchesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Branch Endpoints
    createBranch: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/branches",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.branches],
    }),
    getBranches: build.query<TResponse<any>, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({
        url: "/branches",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.branches],
    }),
    getBranchById: build.query<TResponse<any>, string>({
      query: (id) => ({
        url: `/branches/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: tagTypes.branches, id }],
    }),

    // Hub Endpoints
    createHub: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/branches/hubs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.hubs],
    }),
    getHubs: build.query<TResponse<any>, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({
        url: "/branches/hubs/all",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.hubs],
    }),
    getHubById: build.query<TResponse<any>, string>({
      query: (id) => ({
        url: `/branches/hubs/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: tagTypes.hubs, id }],
    }),
    assignHubProvider: build.mutation<TResponse<any>, { id: string; providerId: string }>({
      query: ({ id, providerId }) => ({
        url: `/branches/hubs/${id}/assign-provider/${providerId}`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: tagTypes.hubs, id }, tagTypes.hubs],
    }),

    // Commissions Endpoints
    getHubCommissions: build.query<TResponse<any>, { id: string; page?: number; limit?: number; search?: string }>({
      query: ({ id, ...params }) => ({
        url: `/branches/hubs/${id}/commissions`,
        method: "GET",
        params,
      }),
      providesTags: (_result, _error, { id }) => [{ type: tagTypes.commissions, id }],
    }),
    payHubCommission: build.mutation<TResponse<any>, { commissionId: string; hubId: string }>({
      query: ({ commissionId }) => ({
        url: `/branches/hubs/commissions/${commissionId}/pay`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, { hubId }) => [{ type: tagTypes.commissions, id: hubId }],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetBranchesQuery,
  useGetBranchByIdQuery,
  useCreateHubMutation,
  useGetHubsQuery,
  useGetHubByIdQuery,
  useAssignHubProviderMutation,
  useGetHubCommissionsQuery,
  usePayHubCommissionMutation,
} = branchesApi;
