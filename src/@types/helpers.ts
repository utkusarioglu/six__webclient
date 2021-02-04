import { RootState } from '_store/store';

/**
 * Alias for uuid
 */
export type uuid = string;

/**
 * Generic type for methods to use inside useSelector hook
 */
export type Selector<T> = (state: RootState) => T;
