import { PostsResponse } from 'six__public-api';
import { ACTION_STATES, ACTION_TYPES } from '_base/store/store.constants';
import { FSA } from '_base/store/store.types';
import postsReducer, { PostReducer } from './Posts.reducer';
import Chance from 'chance';
import { mockPosts } from './mock/mockPosts';

export const chance = new Chance();
let initialState: PostReducer;

describe('components', () => {
  describe('features', () => {
    describe('posts', () => {
      beforeEach(() => {
        initialState = { list: mockPosts() };
      });

      /**
       * Tests the success state of PostResponse arrival
       * Post response carries the list of posts that will reach
       * the screen.
       *
       * Ideally the posts that are already in the list should merge
       * with newly arriving items.
       */
      it('can reduce PostsResponse success', () => {
        const payload = mockPosts();

        const action: FSA<PostsResponse> = {
          type: ACTION_TYPES.REST_RESPONSE,
          state: ACTION_STATES.SUCCESS,
          payload,
        };

        const newState = postsReducer(initialState, action);
        expect(newState.list).toEqual([...initialState.list, ...payload]);
      });

      /**
       * When post fetch fails, it's expected to return the old state.
       * This tests whether that happens
       */
      it('can reduce PostResponse fail', () => {
        const action: FSA<PostsResponse> = {
          type: ACTION_TYPES.REST_RESPONSE,
          state: ACTION_STATES.FAIL,
          errorCode: 0,
        };

        const newState = postsReducer(initialState, action);
        expect(newState).toEqual(initialState);
      });
    });
  });
});
