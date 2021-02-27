import type { PostEndpoint_list, PostEndpoint_single } from '_types/public-api';

type PostGetRes = PostEndpoint_single['_get']['_res']['Success'];
type PostsGetRes = PostEndpoint_list['_get']['_res']['Success'];

export interface PostsState {
  updatedAt: number;
  list: PostExpanded[];
}

/**
 * Expands the received post object with properties required by some components
 */
export type PostExpanded = PostGetRes['body'] & {
  receivedAt: number; // epoch
  // used to check whether post can be displayed on screen, useful
  // in some scenarios
  allowView: boolean;

  communityUrl: string;
  communityStylizedUrl: string;
  communitySlug: string;

  postUrl: string;

  creatorUrl: string;
  creatorSlug: string;
  creatorStylizedUrl: string;

  voteCount: number;
};

export type UpdatePosts = (posts: PostsGetRes['body']) => void;

export type UpvotePost = (postId: PostsState['list'][0]['postSlug']) => void;
