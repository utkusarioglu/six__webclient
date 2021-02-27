import { createSlice } from '@reduxjs/toolkit';
import store from '_store/store';
import { expandPost } from '_helpers/post/expandPost';
import { SetPost, GetPost, GetPostId } from './post.slice.types';
import { initialState } from './post.slice.constants';

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_, action) => {
      return expandPost(action.payload);
    },
    clearPost: () => initialState,
  },
});

export default postSlice.reducer;

export const setPost: SetPost = (postBody) =>
  store.dispatch(postSlice.actions.setPost(postBody));

export const clearPost = () => {
  store.dispatch(postSlice.actions.clearPost());
};

export const getPost: GetPost = (state) => state.post;
export const getPostId: GetPostId = (state) => state.post.id;
