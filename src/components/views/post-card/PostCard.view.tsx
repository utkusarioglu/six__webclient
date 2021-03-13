import type { FC } from 'react';
import type { PostCardViewProps } from './PostCard.view.types';
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
import PostCardMediaView from './PostCardMedia.view';
import PostDetailsForeheadView from '_views/post-details-forehead/PostDetailsForehead.view';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import rest from '_services/rest/rest';
import snacks from '_services/snacks/snacks';
import { selectUser } from '_slices/user/user.slice';
import { useSelector } from 'react-redux';
import { delayIfDev } from '_helpers/dev/delayIfDev';
// import { amendPostVote } from '_slices/post-repo/posts-repo.slice';

const PostCardView: FC<PostCardViewProps> = ({
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

  const voteFunction = (voteSelection: 1 | -1) => {
    if (user.state === 'logged-in') {
      // const voteType = userVote === voteSelection ? null : voteSelection;
      setIsSubmittingVote(true);
      // amend with temp value
      // amendPostVote({ id, voteType });

      delayIfDev(() => {
        rest
          .vote({
            voteType: voteSelection,
            userId: user.id,
            postId: id,
          })
          .then((response) => {
            if (response) {
              if (response.state === 'fail') {
                snacks.push('voteSubmitFail');
              }
            } else {
              snacks.push('voteSubmitFail');
            }
            setIsSubmittingVote(false);
          });
      });
    }
  };

  return (
    <Card className={classes.root}>
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
                variant="h5"
                component="h2"
                className={classes.postTitle}
              >
                {asSkeleton ? <Skeleton /> : postTitle}
              </Typography>
            </CardContent>
          </Grid>
          <PostCardMediaView
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
            <Container>
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
    root: {
      margin: theme.spacing(1),
    },
    cardActions: {
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    cardActionsContainer: {
      paddingLeft: 0,
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
      paddingBottom: theme.spacing(1),
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

export default PostCardView;
