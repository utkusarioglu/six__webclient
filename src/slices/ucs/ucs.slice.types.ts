import type { Selector } from '@reduxjs/toolkit';
import type { RootState } from '_store/store';

export type UcsStore = {
  updatedAt: number;
  list: UcsList;
};
export type UcsList = UcsId[];

export type UcsId = string;

export type SetUcsIds = (ids: UcsList) => void;

export type PushUcsId = (id: UcsId) => void;

export type RemoveUcsId = (id: UcsId) => void;

export type SelectUcsIds = Selector<RootState, UcsStore>;

export type SelectHasUcsId = (id: UcsId) => Selector<RootState, boolean>;
