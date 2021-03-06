import type { FC } from 'react';
import type { PostCardViewProps as PostCardCompactViewProps } from './PostCardCompact.view.types';
import { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import VoteView from '_views/vote/vote.view';
import ShareView from '_views/share/Share.view';
import PostCardCompactMediaView from './PostCardCompactMedia.view';
import PostDetailsForeheadView from '_views/post-details-forehead/PostDetailsForehead.view';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import { selectUser } from '_slices/user/user.slice';
import { useSelector } from 'react-redux';
import { votePost } from '../vote/vote.logic';

const PostCardCompactView: FC<PostCardCompactViewProps> = ({
  id,
  asSkeleton,
  createdAt,
  postTitle,
  postBody,
  mediaImagePath,
  commentCount,
  communityUrl,
  communityStylizedUrl,
  creatorUrl,
  creatorStylizedUrl,
  postUrl,
  communityName,
  likeCount,
  dislikeCount,
  voteCount,
  userVote,
}) => {
  const classes = useStyles();
  const PostDetailsLink = domLinkHelper(postUrl);
  const user = useSelector(selectUser);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const voteFunction = votePost(user, setIsSubmittingVote, id);

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea component={PostDetailsLink}>
        <Grid container spacing={2}>
          <Grid item className={classes.cardActionGridItem}>
            <CardContent className={classes.cardContent}>
              <Container disableGutters className={classes.postDetailsRow}>
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
              <Typography
                gutterBottom
                variant="h6"
                className={classes.postTitle}
              >
                {asSkeleton ? <Skeleton /> : postTitle}
              </Typography>
            </CardContent>
          </Grid>
          <PostCardCompactMediaView
            {...{
              asSkeleton,
              postTitle,
              postBody,
              mediaImagePath,
            }}
          />
        </Grid>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Container className={classes.cardActionsContainer}>
          {asSkeleton ? (
            <Skeleton
              variant="rect"
              width="100%"
              className={classes.cardActionsSkeleton}
            />
          ) : (
            <Container disableGutters>
              <Grid container>
                <VoteView
                  {...{
                    mode: 'post',
                    likeCount,
                    dislikeCount,
                    voteCount,
                    voteFunction,
                    userVote,
                    isSubmitting: isSubmittingVote,
                  }}
                />
                <ShareView />
                <IconButton size="small">
                  <ChatBubbleOutlineIcon
                    className={classes.commentIcon}
                    fontSize="small"
                  />
                  <Typography noWrap>{commentCount}</Typography>
                </IconButton>
              </Grid>
            </Container>
          )}
        </Container>
      </CardActions>
    </Card>
  );
};

export const useStyles = makeStyles((theme) =>
  createStyles({
    /**
     * TODO Community card has the same values, these could be moved to
     * the theme file
     */
    root: {
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 1,
      borderRadius: 0,
      border: 'none',
    },
    cardActions: {
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    cardActionsContainer: {
      paddingLeft: 0,
      paddingRight: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'flex-start',
      margin: 0,
    },
    cardActionsSkeleton: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    cardActionGridItem: {
      width: '100%',
    },
    cardContent: {
      paddingBottom: '0 !important',
    },
    postDetailsRow: {
      // paddingBottom: theme.spacing(),
    },
    commentIcon: {
      marginRight: theme.spacing(1),
    },
    postTitle: {
      marginBottom: 0,
      marginTop: theme.spacing(1),
    },
  })
);

export default PostCardCompactView;
