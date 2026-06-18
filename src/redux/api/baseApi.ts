import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "../tagTypes";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${(import.meta as any).env.VITE_SERVER_URL}/v1`, 
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: tagTypeList,
  endpoints: () => ({}),
});
