import { createSlice, Selector } from '@reduxjs/toolkit';
import cookies from '_services/cookies/cookies';
import { SuccessfulUserLoginRes, UserLoginPostRes } from 'six__public-api';
import store, { RootState } from '_base/store/store';

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
    setUser: (_, action) => {
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

export const setUser: UpdateUser = (user) => {
  if (user.res.loggedIn) {
    cookies.setLoggedIn(true);
    store.dispatch(userSlice.actions.setUser(user.res));
  }
};

type GetLoggedIn = Selector<RootState, UserState['loggedIn']>;

export const getLoggedIn: GetLoggedIn = (state) => state.user.loggedIn;
