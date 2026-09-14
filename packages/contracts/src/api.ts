export interface ApiMeta {
  requestId: string;
}
export interface ApiSuccess<T> {
  data: T;
  error: null;
  meta: ApiMeta;
}
export interface ApiFailure {
  data: null;
  error: { code: string; message: string };
  meta: ApiMeta;
}
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export * from "./notifications";
