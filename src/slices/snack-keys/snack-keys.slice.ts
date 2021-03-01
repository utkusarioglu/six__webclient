import type {
  ClearSnackKeys,
  SetSnackKeys,
  StoreSnackKeys,
  SelectSnackKeys,
  PushSnackKey,
  RemoveSnackKey,
} from './snack-keys.slice.types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { snackRecord } from '_services/snacks/snacks.constants';

const initialState = [] as StoreSnackKeys;

const { actions, reducer } = createSlice({
  name: 'snackKeys',
  initialState,
  reducers: {
    clearSnacks: () => [],

    setSnacks: (_, { payload }: PayloadAction<string[]>) => payload,

    pushSnack: (state, { payload }: PayloadAction<string>) => {
      if (state.includes(payload)) {
        return state;
      }

      return [...state, payload];
    },

    removeSnack: (
      state,
      { payload }: PayloadAction<keyof typeof snackRecord>
    ) => state.filter((snackKey) => snackKey !== payload),
  },
});

export default reducer;

export const clearSnackKeys: ClearSnackKeys = () =>
  dispatch(actions.clearSnacks());

export const setSnackKeys: SetSnackKeys = (snacks: StoreSnackKeys) =>
  dispatch(actions.setSnacks(snacks));

export const selectSnackKeys: SelectSnackKeys = (state) => state.snackKeys;

export const pushSnackKey: PushSnackKey = (snackKey) =>
  dispatch(actions.pushSnack(snackKey));

export const removeSnackKey: RemoveSnackKey = (snackKey) =>
  dispatch(actions.removeSnack(snackKey));
