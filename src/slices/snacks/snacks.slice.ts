import type {
  ClearSnacks,
  SetSnacks,
  StoreSnacks,
  SelectSnacks,
  PushSnack,
  RemoveSnack,
} from './snacks.slice.types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { snackRecords } from '_views/snacks/Snacks.view.constants';

const initialState = [] as StoreSnacks;

const { actions, reducer } = createSlice({
  name: 'snacks',
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
      { payload }: PayloadAction<keyof typeof snackRecords>
    ) => state.filter((snackKey) => snackKey !== payload),
  },
});

export default reducer;

export const clearSnacks: ClearSnacks = () => dispatch(actions.clearSnacks());

export const setSnacks: SetSnacks = (snacks: StoreSnacks) =>
  dispatch(actions.setSnacks(snacks));

export const selectSnacks: SelectSnacks = (state) => state.snacks;

export const pushSnack: PushSnack = (snackKey) =>
  dispatch(actions.pushSnack(snackKey));

export const removeSnack: RemoveSnack = (snackKey) =>
  dispatch(actions.removeSnack(snackKey));
