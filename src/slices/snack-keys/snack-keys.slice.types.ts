import type { Selector } from '@reduxjs/toolkit';
import type { RootState } from '_store/store';
import { snackRecord } from '_services/snacks/snacks.constants';

export type StoreSnackKeys = string[];

export type ClearSnackKeys = () => void;

export type SetSnackKeys = (snacks: StoreSnackKeys) => void;

export type SelectSnackKeys = Selector<RootState, StoreSnackKeys>;

export type PushSnackKey = (snackKey: keyof typeof snackRecord) => void;

export type RemoveSnackKey = (snackKey: keyof typeof snackRecord) => void;

interface SnackbarAction {
  color: 'primary' | 'secondary';
  variant: 'text' | 'contained' | 'outlined';
  href?: string; // url
  text: string;
  onClick?: () => void;
  next?: keyof typeof snackRecord;
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
  duration?: number; // milliseconds, default 20000
}

export type SnackMessage = SnackbarPrompt | SnackbarAlert;

export type SnackMessages = SnackMessage[];

export type SnackRecord = Record<string, SnackMessage>;
