import type { Post } from 'six__public-api';

export interface PostDetailsParams {
  postSlug: Post['postSlug'];
  community_name: Post['communityName'];
}
