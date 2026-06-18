import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
};
