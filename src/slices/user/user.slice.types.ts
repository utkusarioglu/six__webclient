import { UserSessionRes } from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type SetUser = (user: UserSessionRes) => void;
export type GetLoggedIn = Selector<RootState, boolean>;
export type GetUser = Selector<RootState, StoreUser>;

export type StoreLoggedIn = UserSessionRes & {
  userSlug: string;
  userUrl: string;
  userStylizedUrl: string;
};
type StoreVisitor = {
  state: 'visitor';
};
export type StoreUser = StoreLoggedIn | StoreVisitor;
