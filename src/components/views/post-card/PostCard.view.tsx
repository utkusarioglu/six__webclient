import type { FC } from 'react';
import type { PostCardViewProps } from './PostCard.view.types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { darkTheme } from '_base/theme';
import VoteView from '_views/vote/vote.view';
import ShareView from '_views/share/Share.view';
import PostCardMediaView from './PostCardMedia.view';
import PostDetailsRowView from '_views/post-details-row/PostDetailsRow.view';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';

const PostCardView: FC<PostCardViewProps> = ({
  postTitle,
  postBody,
  postSlug,
  voteCount,
  mediaImagePath,
  communityName,
  commentCount,
}) => {
  const classes = useStyles();
  const poster_name = 'someone';
  const timeString = '1 hour ago';
  const communityLinkString = `r/${communityName}`;
  const posterLinkString = `u/${poster_name}`;

  const SlugLink = domLinkHelper(
    `r/${communityName.toLowerCase()}/${postSlug.toLowerCase()}`
  );

  return (
    <Card className={classes.root}>
      <CardActionArea component={SlugLink}>
        <Grid container spacing={2}>
          <Grid item className={classes.cardActionGridItem}>
            <CardContent className={classes.cardContent}>
              <Container disableGutters className={classes.postDetailsRow}>
                <PostDetailsRowView
                  {...{ timeString, communityLinkString, posterLinkString }}
                />
              </Container>
              <Typography gutterBottom variant="h5" component="h2">
                {postTitle}
              </Typography>
            </CardContent>
          </Grid>
          <PostCardMediaView
            {...{
              postTitle,
              postBody,
              mediaImagePath,
            }}
          />
        </Grid>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Container className={classes.cardActionsContainer}>
          <VoteView {...{ voteCount: voteCount }} />
          <ShareView />
          <IconButton>
            <ChatBubbleOutlineIcon className={classes.commentIcon} />
            <Typography noWrap>{commentCount}</Typography>
          </IconButton>
        </Container>
      </CardActions>
    </Card>
  );
};

export const useStyles = makeStyles({
  root: {
    margin: darkTheme.spacing(1),
  },
  cardActions: {
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: 0,
    paddingTop: darkTheme.spacing(2),
  },
  cardActionsContainer: {
    paddingLeft: 0,
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    margin: 0,
  },
  cardActionGridItem: {
    width: '100%',
  },
  cardContent: {
    paddingBottom: '0 !important',
  },
  postDetailsRow: {
    paddingBottom: darkTheme.spacing(1),
  },
  commentIcon: {
    marginRight: darkTheme.spacing(1),
  },
});

export default PostCardView;
