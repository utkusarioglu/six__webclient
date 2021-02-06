import type { FC } from 'react';
import type { PostDetailsProps } from './PostDetails.view.types';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PostDetailsRowView from '_views/post-details-row/PostDetailsRow.view';
import PostDetailsToolbarView from './PostDetailsToolbar.view';
import { useSelector } from 'react-redux';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import { getPostBySlug } from '_base/components/slices/posts/posts.slice';
import rest from '_services/rest/rest';

const PostDetailsView: FC<PostDetailsProps> = ({ postSlug }) => {
  const classes = useStyles();
  const post = useSelector(getPostBySlug(postSlug));
  let asSkeleton = !post;

  if (!postSlug) {
    return <span>something went wrong</span>;
  }

  const getPost = () => delayIfDev(() => rest.getPostBySlug(postSlug));

  if (!post) {
    getPost();
    return <Skeleton variant="rect" height={100} />;
  }

  const {
    postTitle = '',
    postBody = '',
    createdAt = '',
    communityUrl = '',
    communityStylizedUrl = '',
    creatorUrl = '',
    creatorStylizedUrl = '',
  } = post;

  return (
    <>
      <PostDetailsToolbarView {...{ asSkeleton, postSlug }} />
      <Container className={classes.postDetailsRow}>
        <PostDetailsRowView
          {...{
            asSkeleton,
            createdAt,
            communityUrl,
            communityStylizedUrl,
            creatorUrl,
            creatorStylizedUrl,
          }}
        />
      </Container>
      <Container className={classes.postDetailsTitleContainer}>
        <Typography variant="h4">
          {asSkeleton ? <Skeleton /> : postTitle}
        </Typography>
      </Container>
      <Container>
        <Typography>{asSkeleton ? <Skeleton /> : postBody}</Typography>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    postDetailsRow: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    postDetailsTitleContainer: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default PostDetailsView;
