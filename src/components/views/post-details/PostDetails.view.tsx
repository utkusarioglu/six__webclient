import type { FC } from 'react';
import type { PostDetailsProps } from './PostDetails.view.types';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PostDetailsRowView from '_views/post-details-row/PostDetailsRow.view';
import { darkTheme } from '_base/theme';
import { withState } from '_features/post-details/PostDetails.feature';
import PostDetailsToolbarView from './PostDetailsToolbar.view';

const PostDetailsView: FC<PostDetailsProps> = ({ post }) => {
  const classes = useStyles();
  if (!post) {
    return <Skeleton variant="rect" height={100} />;
  }
  const { postTitle, postBody, communityName } = post;

  const poster_name = 'someone';
  const timeString = '1 hour ago';
  const communityLinkString = `r/${communityName}`;
  const posterLinkString = `u/${poster_name}`;

  return (
    <>
      <PostDetailsToolbarView />
      <Container className={classes.postDetailsRow}>
        <PostDetailsRowView
          {...{ timeString, communityLinkString, posterLinkString }}
        />
      </Container>
      <Container>
        <Typography variant="h3">{postTitle}</Typography>
      </Container>
      <Container>
        <span>{postBody}</span>
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

// @ts-ignore
export default withState(PostDetailsView);
