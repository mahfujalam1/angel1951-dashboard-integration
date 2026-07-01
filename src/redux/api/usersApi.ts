import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { TResponse } from "../../types/response.types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<TResponse<any>, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    createUser: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = usersApi;
