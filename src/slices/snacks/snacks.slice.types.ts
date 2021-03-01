import type { Selector } from '@reduxjs/toolkit';
import type { RootState } from '_store/store';
import type { snackRecords } from '_views/snacks/Snacks.view.constants';

export type StoreSnacks = string[];

export type ClearSnacks = () => void;

export type SetSnacks = (snacks: StoreSnacks) => void;

export type SelectSnacks = Selector<RootState, StoreSnacks>;

export type PushSnack = (snackKey: keyof typeof snackRecords) => void;

export type RemoveSnack = (snackKey: keyof typeof snackRecords) => void;
