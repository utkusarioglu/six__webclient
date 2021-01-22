import type { PostsResponse } from 'six__public-api';
import { FSA } from '_store/store.types';
import { ACTION_STATES, ACTION_TYPES } from '_store/store.constants';

export interface PostReducer {
  list: PostsResponse;
}
type PostReducerActions = PostsResponse;

const initialState: PostReducer = {
  list: [],
};

function postsReducer(
  state: PostReducer = initialState,
  action: FSA<PostReducerActions>
) {
  switch (action.type) {
    case ACTION_TYPES.REST_RESPONSE:
      if (action.state === ACTION_STATES.FAIL) {
        return state;
      }

      state = {
        ...state,
        list: [...state.list, ...(action.payload as PostsResponse)],
      };

      return state;

    default:
      return state;
  }
}

export default postsReducer;
