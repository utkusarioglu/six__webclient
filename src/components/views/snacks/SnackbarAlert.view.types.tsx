import { SnackbarAlert } from '_slices/snack-keys/snack-keys.slice.types';

export interface SnackbarAlertViewProps {
  open: boolean;
  currentSnack: SnackbarAlert;
  onExit: () => void;
  setOpen: (open: boolean) => void;
}
