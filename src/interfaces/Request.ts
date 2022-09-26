export interface IResquest {
  status: string;
  id: string;
  name: string;
}

export interface ICleanUpRequest {
  type: "post" | "get" | "put";
  payload: null;
}
