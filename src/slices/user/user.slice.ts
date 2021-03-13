import type { SetUser, SelectLoggedIn, SelectUser } from './user.slice.types';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserEp_session_res_body } from '_types/public-api';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { initialState } from './user.slice.constants';
import { expandUser } from './user.slice.logic';

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, { payload: user }: PayloadAction<UserEp_session_res_body>) => {
      return expandUser(user);
    },
  },
});

export default reducer;

export const setUser: SetUser = (user) => dispatch(actions.setUser(user));

export const selectLoggedIn: SelectLoggedIn = (state) =>
  state.user.state === 'logged-in';

export const selectUser: SelectUser = (state) => state.user;
