import type { PostEndpoint_single_res_body } from '_types/public-api';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  SetPost,
  SelectPost,
  SelectPostId,
  ClearPost,
} from './post.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { expandPost } from '_slices/@shared/expandPost';
import { initialState } from './post.slice.constants';

const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_, { payload }: PayloadAction<PostEndpoint_single_res_body>) => {
      return expandPost(payload);
    },
    clearPost: () => initialState,
  },
});

export default reducer;

export const setPost: SetPost = (postBody) =>
  dispatch(actions.setPost(postBody));

export const clearPost: ClearPost = () => {
  dispatch(actions.clearPost());
};

export const selectPost: SelectPost = (state) => state.post;

export const selectPostId: SelectPostId = (state) => state.post.id;
