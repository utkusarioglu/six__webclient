import { createSlice } from '@reduxjs/toolkit';

import { SuccessfulUserLoginRes, UserLoginPostRes } from 'six__public-api';
import store from '_base/store/store';

type UserExpanded = SuccessfulUserLoginRes & {
  userSlug: string;
  userUrl: string;
  userStylizedUrl: string;
};

type Visitor = { loggedIn: boolean };
type UserState = UserExpanded | Visitor;

const initialState: UserState = {
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (_, action) => {
      const received: SuccessfulUserLoginRes = action.payload;
      const { username } = received;
      const userSlug = username.toLowerCase();

      const expanded: UserExpanded = {
        ...received,
        userSlug,
        userUrl: `u/${userSlug}`,
        userStylizedUrl: `u/${username}`,
      };

      return expanded;
    },
  },
});

export default userSlice.reducer;

type UpdateUser = (user: UserLoginPostRes) => void;

export const updateUser: UpdateUser = (user) => {
  if (user.res.loggedIn) {
    store.dispatch(userSlice.actions.updateUser(user.res));
  }
};
