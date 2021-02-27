import type { FC } from 'react';
import type { PostDetailsProps } from './PostDetails.view.types';
import { useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PostDetailsForeheadView from '_views/post-details-forehead/PostDetailsForehead.view';
import PostDetailsToolbarView from './PostDetailsToolbar.view';
import { useSelector } from 'react-redux';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import { selectPost, clearPost } from '_slices/post/post.slice';
import rest from '_services/rest/rest';

const PostDetailsView: FC<PostDetailsProps> = ({ postSlug }) => {
  const classes = useStyles();
  const post = useSelector(selectPost);
  const { allowView } = post;
  let asSkeleton = !allowView;

  // clears the post when the user navigates away from post details
  useEffect(() => clearPost, []);

  if (!postSlug) {
    return <span>something went wrong</span>;
  }

  const retrievePost = () => delayIfDev(() => rest.getPostBySlug(postSlug));

  if (!allowView) {
    retrievePost();
  }

  const {
    postTitle,
    postBody,
    createdAt,
    communityUrl,
    communityStylizedUrl,
    creatorUrl,
    creatorStylizedUrl,
    communityName,
  } = post;

  return (
    <>
      <PostDetailsToolbarView {...{ asSkeleton, postSlug }} />
      <Container className={classes.postDetailsRow}>
        <PostDetailsForeheadView
          {...{
            asSkeleton,
            createdAt,
            communityName,
            communityUrl,
            communityStylizedUrl,
            creatorUrl,
            creatorStylizedUrl,
          }}
        />
      </Container>
      <Container className={classes.postDetailsTitleContainer}>
        <Typography variant="h4">
          {asSkeleton ? <Skeleton height="50px" /> : postTitle}
        </Typography>
      </Container>
      <Container className={classes.postBody}>
        <Typography>
          {asSkeleton ? (
            <Skeleton
              height="120px"
              variant="rect"
              className={classes.postBodySkeleton}
            />
          ) : (
            postBody
          )}
        </Typography>
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
    postBody: {
      marginBottom: theme.spacing(3),
    },
    postBodySkeleton: {
      borderRadius: theme.spacing(1 / 2),
    },
  })
);

export default PostDetailsView;
