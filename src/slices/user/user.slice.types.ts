import { UserEndpoint_session_res_body } from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';

export type SetUser = (user: UserEndpoint_session_res_body) => void;

export type SelectLoggedIn = Selector<RootState, boolean>;

export type SelectUser = Selector<RootState, StoreUser>;

export type StoreLoggedIn = UserEndpoint_session_res_body & {
  userSlug: string;
  userUrl: string;
  userStylizedUrl: string;
};

type StoreVisitor = {
  state: 'visitor';
};

export type StoreUser = StoreLoggedIn | StoreVisitor;
