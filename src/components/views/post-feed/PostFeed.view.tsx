import type { FC, ReactElement } from 'react';
import type { PostsViewProps as PostFeedViewProps } from './PostFeed.view.types';
import { useSelector } from 'react-redux';
import PostCardView from '_views/post-card/PostCard.view';
import rest from '_services/rest/rest';
import {
  getPostRepoLastUpdate,
  getPostRepo,
} from '_slices/post-repo/posts-repo.slice';
import { emptyPost } from '_slices/post/post.slice';
import { delayIfDev } from '_helpers/dev/delayIfDev';

const PostFeedView: FC<PostFeedViewProps> = () => {
  const postsAge = useSelector(getPostRepoLastUpdate);
  const list = useSelector(getPostRepo);
  const getPosts = () => delayIfDev(() => rest.getPosts());

  // THis is faulty logic
  if (list.length <= 0) {
    getPosts();
    return skeletons();
  } else if (postsAge > 10000) {
    getPosts();
  }

  return (
    <div>
      {list &&
        list.map((post) => (
          <PostCardView {...{ key: post.id, asSkeleton: false, ...post }} />
        ))}
    </div>
  );
};

export default PostFeedView;

function skeletons(): ReactElement<any, any>[] {
  return Array(3)
    .fill(null)
    .map((_, idx) => (
      <PostCardView
        {...{
          key: idx,
          asSkeleton: true,
          ...emptyPost,
        }}
      />
    ));
}
