import type { FC } from 'react';
import type { PostsViewProps as PostFeedViewProps } from './PostFeed.view.types';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import PostCardView from '_views/post-card/PostCard.view';
import rest from '_services/rest/rest';
import { getPostRepo } from '_slices/post-repo/posts-repo.slice';
import { emptyPost } from '_slices/post/post.slice.constants';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';

const PostFeedView: FC<PostFeedViewProps> = () => {
  const { updatedAt, list: posts } = useSelector(getPostRepo);
  const getPosts = () => delayIfDev(() => rest.getPosts());
  const CommunitiesLink = domLinkHelper('/communities');

  // THis is faulty logic
  if (!updatedAt) {
    getPosts();
    return skeletons();
  } else if (Date.now() - updatedAt > 10000) {
    // instead show a prompt to the user
    getPosts();
  }

  if (updatedAt && !posts.length) {
    return (
      <Container>
        <Typography>There isn't anything new...</Typography>
        <Typography>
          You need to follow more communities.{' '}
          <Link component={CommunitiesLink}>Click here</Link>
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <PostCardView {...{ key: post.id, asSkeleton: false, ...post }} />
        ))}
    </div>
  );
};

export default PostFeedView;

function skeletons() {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <PostCardView
            {...{
              key: idx,
              asSkeleton: true,
              ...emptyPost,
            }}
          />
        ))}
    </>
  );
}
