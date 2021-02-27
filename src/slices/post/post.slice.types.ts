import { PostEndpoint_single } from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';
import { PostExpanded } from '_slices/post-repo/posts-repo.slice.types';

export type PostState = PostExpanded;
export type SelectPost = Selector<RootState, PostState>;
export type SelectPostId = Selector<RootState, PostState['id']>;
export type PostSingleBody = PostEndpoint_single['_get']['_res']['Success']['body'];
export type SetPost = (postBody: PostSingleBody) => void;
