import type { PostEndpoint_single_res_body } from '_types/public-api';
import type { StorePost } from '_slices/post-repo/posts-repo.slice.types';

/**
 * Computes the inferable properties of the post from the raw version
 * that is received from the server
 *
 * @param raw raw post from the server
 * @returns expanded post object that multiple components use
 */
export function expandPost(raw: PostEndpoint_single_res_body): StorePost {
  const {
    communityName,
    creatorUsername,
    postSlug,
    likeCount,
    dislikeCount,
    communitySlug,
  } = raw;

  const creatorSlug = creatorUsername.toLowerCase();

  return {
    ...raw,
    receivedAt: Date.now(),
    allowView: true,
    communitySlug,
    creatorSlug,
    communityUrl: `r/${communitySlug}`,
    communityStylizedUrl: `r/${communityName}`,
    creatorUrl: `u/${creatorSlug}`,
    creatorStylizedUrl: `u/${creatorUsername}`,
    postUrl: `r/${communitySlug}/${postSlug}`,
    voteCount: likeCount - dislikeCount,
  };
}
