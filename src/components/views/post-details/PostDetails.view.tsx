import type { FC } from 'react';
import type { PostDetailsProps } from './PostDetails.view.types';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PostDetailsRowView from '_views/post-details-row/PostDetailsRow.view';
import { darkTheme } from '_base/theme';
import PostDetailsToolbarView from './PostDetailsToolbar.view';
import { useSelector } from 'react-redux';
import { getPostBySlug } from '_base/components/slices/posts/posts.slice';
import rest from '_services/rest/rest';

const PostDetailsView: FC<PostDetailsProps> = ({ postSlug }) => {
  const classes = useStyles();
  const post = useSelector(getPostBySlug(postSlug));

  if (!postSlug) {
    return <span>something went wrong</span>;
  }

  if (!post) {
    rest.getPostBySlug(postSlug);
    return <Skeleton variant="rect" height={100} />;
  }

  const {
    postTitle,
    postBody,
    communityName,
    postCreatorUsername,
    createdAt,
  } = post;

  const communityLinkString = `r/${communityName}`;
  const posterLinkString = `u/${postCreatorUsername}`;

  return (
    <>
      <PostDetailsToolbarView {...{ postSlug }} />
      <Container className={classes.postDetailsRow}>
        <PostDetailsRowView
          {...{ createdAt, communityLinkString, posterLinkString }}
        />
      </Container>
      <Container>
        <Typography variant="h3">{postTitle}</Typography>
      </Container>
      <Container>
        <Typography>{postBody}</Typography>
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  postDetailsRow: {
    paddingTop: darkTheme.spacing(2),
    paddingBottom: darkTheme.spacing(2),
  },
});

export default PostDetailsView;
