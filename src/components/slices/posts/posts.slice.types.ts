import { PostGetRes, PostsGetRes } from 'six__public-api';

export interface PostsState {
  lastUpdate: number;
  list: PostExpanded[];
}

/**
 * Expands the received post object with properties required by some components
 */
export type PostExpanded = PostGetRes['res'] & {
  communityUrl: string;
  communityStylizedUrl: string;
  communitySlug: string;

  postUrl: string;

  creatorUrl: string;
  creatorSlug: string;
  creatorStylizedUrl: string;
};

export type UpdatePosts = (posts: PostsGetRes['res']) => void;

export type UpvotePost = (postId: PostsState['list'][0]['postSlug']) => void;
