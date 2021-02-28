interface SnackbarAction {
  color: 'primary' | 'secondary';
  variant: 'text' | 'contained' | 'outlined';
  href?: string;
  text: string;
  closeOnAction: boolean;
  onClick: () => void;
}
interface SnackbarCommon {
  message: string;
}

export interface SnackbarPrompt extends SnackbarCommon {
  alert: 'none';
  actions: SnackbarAction[];
}

export interface SnackbarAlert extends SnackbarCommon {
  alert: 'error' | 'warning' | 'info' | 'success';
  duration: number; // seconds
}
export type SnackMessage = SnackbarPrompt | SnackbarAlert;

export type SnackMessages = SnackMessage[];
