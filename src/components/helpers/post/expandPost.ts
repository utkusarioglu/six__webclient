import { PostExpanded } from '_slices/post-repo/posts-repo.slice.types';
import { PostEndpoint } from 'six__public-api';

/**
 * Computes the inferable properties of the post from the raw version
 * that is received from the server
 *
 * @param raw raw post from the server
 * @returns expanded post object that multiple components use
 */
export function expandPost(
  raw: PostEndpoint['_single']['_v1']['_get']['_res']['Success']['body']
): PostExpanded {
  const {
    communityName,
    creatorUsername,
    postSlug,
    likeCount,
    dislikeCount,
  } = raw;

  const communitySlug = communityName.toLowerCase();
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
