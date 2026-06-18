export type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};
