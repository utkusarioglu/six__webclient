import { PostsGetRes } from 'six__public-api';

export interface PostsState {
  lastUpdate: number;
  list: PostsGetRes['res'];
}

export type UpdatePosts = (posts: PostsState['list']) => void;

export type UpvotePost = (postId: PostsState['list'][0]['postSlug']) => void;
