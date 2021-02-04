import type { FC } from 'react';
import type { PostsViewProps as PostFeedViewProps } from './PostFeed.view.types';
import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import PostCardView from '_views/post-card/PostCard.view';
import { NODE_ENV } from '_base/config';
import rest from '_services/rest/rest';
import { getPostsAge, getPostsList } from '_slices/posts/posts.slice';

const PostFeedView: FC<PostFeedViewProps> = () => {
  const postsAge = useSelector(getPostsAge);
  const list = useSelector(getPostsList);

  const getPosts = () => {
    if (NODE_ENV === 'development') {
      setTimeout(() => {
        rest.getPosts();
      }, 1000);
    } else {
      rest.getPosts();
    }
  };

  if (list.length <= 1) {
    getPosts();
    return <Skeleton></Skeleton>;
  } else if (postsAge > 10000) {
    getPosts();
  }

  return (
    <div>
      {list &&
        list.map((post) => <PostCardView {...{ key: post.id, ...post }} />)}
    </div>
  );
};

export default PostFeedView;
