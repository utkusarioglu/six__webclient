import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { expandPost } from '_helpers/post/expandPost';
import { SetPost, SelectPost, SelectPostId } from './post.slice.types';
import { initialState } from './post.slice.constants';

const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_, action) => {
      return expandPost(action.payload);
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
