import type {
  PostEp_single_res_body,
  PostEp_vote_res_body,
} from '_types/public-api';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  SetPost,
  SelectPost,
  SelectPostId,
  ClearPost,
  AmendPostDetailsVote,
} from './post.slice.types';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '_store/store';
import { expandPost } from '_slices/@shared/expandPost';
import { initialState } from './post.slice.constants';

const { actions, reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_, { payload }: PayloadAction<PostEp_single_res_body>) => {
      return expandPost(payload);
    },

    clearPost: () => initialState,

    amendVote: (
      state,
      {
        payload: { id, likeCount, dislikeCount, userVote },
      }: PayloadAction<PostEp_vote_res_body>
    ) => {
      if (state.id !== id) {
        return state;
      }

      return {
        ...state,
        likeCount,
        dislikeCount,
        voteCount: likeCount - dislikeCount,
        userVote,
      };
    },
  },
});

export default reducer;

export const setPost: SetPost = (postBody) =>
  dispatch(actions.setPost(postBody));

export const clearPost: ClearPost = () => {
  dispatch(actions.clearPost());
};

export const amendPostDetailsVote: AmendPostDetailsVote = (postBody) =>
  dispatch(actions.amendVote(postBody));

export const selectPost: SelectPost = (state) => state.post;

export const selectPostId: SelectPostId = (state) => state.post.id;
