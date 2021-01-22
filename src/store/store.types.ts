import { ACTION_TYPES, ACTION_STATES } from './store.constants';
import type { PostReducer } from '_features/posts/Posts.reducer';

/**
 * Collects all the types from all the sources that contribute to the state.
 */
export default interface RootReducer {
  posts: PostReducer;
  // app: AppState;
}

/*
Even though this is a class, it's here to nest enums from different
features because of this, it's in screaming snake case as enums are.

This project treats enums as constants and adops the naming convention 
for constants for enums.
*/
export class ERROR_CODES {}

/**
 * Flux standard action SUCCESS
 *
 * @privateRemarks
 * type property needs more work to reach a good type casting solution. The
 * intent is to have a type that combines all the type enums from all
 * the services and features that contribute to the state.
 */
interface FSASuccess<T> {
  state: ACTION_STATES.SUCCESS;
  type: ACTION_TYPES;
  payload: T;
}

/**
 * Flux standard action fail
 *
 * @privateRemarks
 * type property needs more work to reach a good type casting solution. The
 * intent is to have a type that combines all the type enums from all
 * the services and features that contribute to the state.
 */
interface FSAFailure {
  state: ACTION_STATES.FAIL;
  type: ACTION_TYPES;
  errorCode: ERROR_CODES;
  meta?: any;
}

/**
 * Aggregate type for Flux standard actions
 * Both success and failure states, the distinction is made by the
 * "state" property
 */
export type FSA<T> = FSASuccess<T> | FSAFailure;

/**
 * Dispatch method for redux
 */
export type DispatchMethod<T> = (vars: FSA<T>) => void;
