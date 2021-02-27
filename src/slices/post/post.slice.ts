import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  SetPost,
  SelectPost,
  SelectPostId,
  PostSingleBody,
} from './post.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { expandPost } from '_helpers/post/expandPost';
import { initialState } from './post.slice.constants';

const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_, { payload: post }: PayloadAction<PostSingleBody>) => {
      return expandPost(post);
    },
    clearPost: () => initialState,
  },
});

export default reducer;

export const setPost: SetPost = (postBody) =>
  dispatch(actions.setPost(postBody));

export const clearPost = () => {
  dispatch(actions.clearPost());
};

export const selectPost: SelectPost = (state) => state.post;

export const selectPostId: SelectPostId = (state) => state.post.id;
