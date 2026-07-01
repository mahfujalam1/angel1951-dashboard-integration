import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { TResponse } from "../../types/response.types";

export const rewardsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRewardRules: build.query<TResponse<any>, void>({
      query: () => ({
        url: "/rewards/rules",
        method: "GET",
      }),
      providesTags: [tagTypes.rewards],
    }),
    createOrUpdateRewardRule: build.mutation<TResponse<any>, any>({
      query: (data) => ({
        url: "/rewards/rules",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.rewards],
    }),
    toggleRewardRule: build.mutation<TResponse<any>, { rewardType: string; isActive: boolean }>({
      query: ({ rewardType, isActive }) => ({
        url: `/rewards/rules/${rewardType}`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: [tagTypes.rewards],
    }),
  }),
});

export const {
  useGetRewardRulesQuery,
  useCreateOrUpdateRewardRuleMutation,
  useToggleRewardRuleMutation,
} = rewardsApi;
