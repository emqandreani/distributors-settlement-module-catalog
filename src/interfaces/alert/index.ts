export interface IAlertSliceState {
  open: boolean;
  type: "success" | "info" | "warning" | "error" | null;
  message: string;
}
