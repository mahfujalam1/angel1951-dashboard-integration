import { tagTypes } from "../../tagTypes";
import { TResponse } from "../../../types/response.types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    getProfile: build.query<TResponse<any>, any>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    forgotPassword: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: build.mutation<TResponse<any>, any>({
      query: (formData) => ({
        url: "/users/me",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
