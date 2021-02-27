import { PostEndpoint_single } from '_types/public-api';
import { Selector } from '@reduxjs/toolkit';
import { RootState } from '_store/store';
import { PostExpanded } from '_slices/post-repo/posts-repo.slice.types';

export type PostState = PostExpanded;
export type GetPost = Selector<RootState, PostState>;
export type GetPostId = Selector<RootState, PostState['id']>;
export type SetPost = (
  postBody: PostEndpoint_single['_get']['_res']['Success']['body']
) => void;
