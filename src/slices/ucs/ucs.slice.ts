import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import {
  UcsStore,
  SetUcsIds,
  PushUcsId,
  RemoveUcsId,
  SelectUcsIds,
  SelectHasUcsId,
  UcsId,
  UcsList,
} from './ucs.slice.types';

const initialState = {
  updatedAt: 0,
  list: [],
} as UcsStore;

const { actions, reducer } = createSlice({
  name: 'ucs',
  initialState,
  reducers: {
    setUcsIds: (_, { payload }: PayloadAction<UcsList>) => ({
      updatedAt: Date.now(),
      list: payload,
    }),

    pushUcsId: (state, { payload }: PayloadAction<UcsId>) => {
      if (!!state.list.length && state.list.includes(payload)) return state;
      return {
        ...state,
        list: [...state.list, payload],
      };
    },

    removeUcsById: (state, { payload }: PayloadAction<UcsId>) => {
      return {
        ...state,
        list: state.list.filter((ucs) => ucs !== payload),
      };
    },
  },
});

export default reducer;

export const setUcsIds: SetUcsIds = (ids) => dispatch(actions.setUcsIds(ids));

export const pushUcsId: PushUcsId = (id) => dispatch(actions.pushUcsId(id));

export const removeUcsId: RemoveUcsId = (id) =>
  dispatch(actions.removeUcsById(id));

export const selectUcsIds: SelectUcsIds = (state) => state.ucs;

export const selectHasUcsId: SelectHasUcsId = (id) => (state) =>
  !!state.ucs.list.length && state.ucs.list.includes(id);
