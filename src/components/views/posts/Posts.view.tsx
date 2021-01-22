import type { FC } from 'react';
import type { PostsViewProps } from './Posts.view.types';
import Skeleton from '@material-ui/lab/Skeleton';
import { withState } from '_features/posts/Posts.feature';
import PostCardView from '_views/post-card/PostCard.view';

const PostsView: FC<PostsViewProps> = ({ list }) => {
  if (list.length === 0) {
    return <Skeleton></Skeleton>;
  }

  return (
    <div>
      {list &&
        list.map((post) => <PostCardView {...{ key: post.id, ...post }} />)}
    </div>
  );
};

export default withState(PostsView);
