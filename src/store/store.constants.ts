/**
 * Allowed action types
 *
 * @remarks
 * Any new store participant service or feature will need to enlist their
 * actions on this list for them to be available.
 */
export enum ACTION_TYPES {
  REST_RESPONSE = 'REST_RESPONSE',
}

/**
 * Allowed action states
 */
export enum ACTION_STATES {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
