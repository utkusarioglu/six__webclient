import type { FC } from 'react';
import type { PostCardViewProps } from './PostCard.view.types';
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
import PostCardVoteView from '_views/post-card-vote/vote.view';
import ShareView from '_views/share/Share.view';
import PostCardMediaView from './PostCardMedia.view';
import PostDetailsForeheadView from '_views/post-details-forehead/PostDetailsForehead.view';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';

const PostCardView: FC<PostCardViewProps> = ({
  asSkeleton,
  createdAt,
  postTitle,
  postBody,
  postSlug,
  mediaImagePath,
  commentCount,
  communityUrl,
  communityStylizedUrl,
  creatorUrl,
  creatorStylizedUrl,
  postUrl,
  communityName,
}) => {
  const classes = useStyles();
  const PostDetailsLink = domLinkHelper(postUrl);

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
            <>
              <PostCardVoteView {...{ postSlug }} />
              <ShareView />
              <IconButton>
                <ChatBubbleOutlineIcon className={classes.commentIcon} />
                <Typography noWrap>{commentCount}</Typography>
              </IconButton>
            </>
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
      padding: 0,
      paddingTop: theme.spacing(2),
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
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
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
