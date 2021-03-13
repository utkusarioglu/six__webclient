import type { CommunityEp_single_res_body } from '_types/public-api';
import type { CommunityState } from '_slices/community/community.slice.types';

/**
 * Computes the inferable properties of the community from the raw version
 * that is received from the server
 *
 * @param raw raw community from the server
 * @returns expanded community object that multiple components use
 */
export function expandCommunity(
  raw: CommunityEp_single_res_body
): CommunityState {
  const { slug } = raw;

  return {
    ...raw,
    receivedAt: Date.now(),
    allowView: true,
    communityUrl: `r/${slug}`,
  };
}
