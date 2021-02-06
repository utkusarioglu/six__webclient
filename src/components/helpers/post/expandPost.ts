import { PostExpanded } from '_slices/post-repo/posts-repo.slice.types';
import { PostGetRes } from 'six__public-api';

/**
 * Computes the inferable properties of the post from the raw version
 * that is received from the server
 *
 * @param raw raw post from the server
 * @returns expanded post object that multiple components use
 */
export function expandPost(raw: PostGetRes['res']): PostExpanded {
  const { communityName, creatorUsername, postSlug } = raw;

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
  };
}