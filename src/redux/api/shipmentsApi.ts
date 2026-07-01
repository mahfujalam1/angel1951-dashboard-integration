import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { TResponse } from "../../types/response.types";

export const shipmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Shipments
    createT1Shipment: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/shipments/t1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.shipments],
    }),
    createT2T3Shipment: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/shipments/t2t3",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.shipments],
    }),
    createCorporateShipment: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/shipments/corporate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.shipments],
    }),

    // Status Updates
    markShipmentPickedUp: build.mutation<TResponse<any>, { id: string; files?: any[] }>({
      query: ({ id, files }) => {
        const formData = new FormData();
        if (files) {
          files.forEach((file) => formData.append("files", file));
        }
        return {
          url: `/shipments/${id}/pickup`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: tagTypes.shipments, id }, tagTypes.shipments],
    }),
    markShipmentArrived: build.mutation<TResponse<any>, { id: string; cost: number; branchId: string }>({
      query: ({ id, ...data }) => ({
        url: `/shipments/${id}/arrive`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: tagTypes.shipments, id }, tagTypes.shipments],
    }),
    updateShipmentStatus: build.mutation<TResponse<any>, { id: string; status: string; notes?: string; files?: any[] }>({
      query: ({ id, status, notes, files }) => {
        const formData = new FormData();
        formData.append("status", status);
        if (notes) formData.append("notes", notes);
        if (files) {
          files.forEach((file) => formData.append("files", file));
        }
        return {
          url: `/shipments/${id}/status`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: tagTypes.shipments, id }, tagTypes.shipments],
    }),

    // Get Shipments
    getAdminShipments: build.query<TResponse<any>, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({
        url: "/shipments/admin",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.shipments],
    }),
    trackShipment: build.query<TResponse<any>, string>({
      query: (trackingNumber) => ({
        url: `/shipments/track/${trackingNumber}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: tagTypes.shipments, id }],
    }),
    
    // Hub Summary
    getHubsSummary: build.query<TResponse<any>, void>({
      query: () => ({
        url: "/shipments/hubs-summary",
        method: "GET",
      }),
      providesTags: [tagTypes.shipments],
    }),
  }),
});

export const {
  useCreateT1ShipmentMutation,
  useCreateT2T3ShipmentMutation,
  useCreateCorporateShipmentMutation,
  useMarkShipmentPickedUpMutation,
  useMarkShipmentArrivedMutation,
  useUpdateShipmentStatusMutation,
  useGetAdminShipmentsQuery,
  useTrackShipmentQuery,
  useGetHubsSummaryQuery,
} = shipmentsApi;
