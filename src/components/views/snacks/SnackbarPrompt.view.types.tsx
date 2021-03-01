import { SnackbarPrompt } from '_slices/snack-keys/snack-keys.slice.types';

export interface SnackPromptViewProps {
  open: boolean;
  onExit: () => void;
  currentSnack: SnackbarPrompt;
  setNext: (next: string) => void;
  setOpen: (open: boolean) => void;
  incrementSnackCursor: () => void;
}
