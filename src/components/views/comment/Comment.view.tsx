import type { FC, CSSProperties } from 'react';
import type { SliceComment } from '_slices/comments/comments.slice.types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Timeago from 'react-timeago';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import VoteView from '../vote/vote.view';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from '@material-ui/core/IconButton';

type CommentViewProps = SliceComment;

const CommentView: FC<CommentViewProps> = ({
  asSkeleton,
  id,
  body,
  createdAt,
  creatorUsername,
  creatorStylizedUrl,
  creatorUrl,
  parentId,
  likeCount,
  voteCount,
  dislikeCount,
  state,
}) => {
  const classes = useStyles();
  const CreatorLink = domLinkHelper(creatorUrl);
  const avatarSize = parentId !== null ? '25px' : '35px';
  const avatarStyle: CSSProperties = {
    width: avatarSize,
    height: avatarSize,
  };

  const voteFunction: (voteType: number) => void = (voteType) =>
    alert(`vote: ${voteType}`);

  const replyFunction = () => alert(`reply to: ${id}`);

  return (
    <Paper
      elevation={0}
      className={classes.root}
      style={{ opacity: state === 'submitted' ? 1 : 0.5 }}
    >
      {asSkeleton ? (
        <Skeleton variant="circle" style={avatarStyle}>
          <Avatar style={avatarStyle} />
        </Skeleton>
      ) : (
        <Avatar style={avatarStyle}>{creatorUsername[0].toUpperCase()}</Avatar>
      )}

      <Container>
        <Container disableGutters className={classes.hud}>
          {asSkeleton ? (
            <Skeleton width="100%" />
          ) : (
            <>
              <Link
                color="textPrimary"
                component={CreatorLink}
                className={classes.hudItem}
              >
                {creatorStylizedUrl}
              </Link>
              <Link color="textSecondary">
                <Timeago date={createdAt} />
              </Link>
            </>
          )}
        </Container>

        {asSkeleton ? (
          <Skeleton height="50px" />
        ) : (
          <Typography className={classes.body}>{body}</Typography>
        )}

        {asSkeleton ? (
          <Skeleton />
        ) : (
          <Container disableGutters className={classes.actions}>
            <Grid container direction="row">
              <VoteView
                {...{
                  mode: 'comment',
                  likeCount,
                  dislikeCount,
                  voteCount,
                  voteFunction,
                }}
              />

              <IconButton size="small" onClick={replyFunction}>
                <ChatBubbleOutlineIcon
                  className={classes.commentIcon}
                  fontSize="small"
                />
                <Typography noWrap>Reply</Typography>
              </IconButton>
            </Grid>
          </Container>
        )}
      </Container>
    </Paper>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
    },

    hud: {
      display: 'flex',
      flexDirection: 'row',
    },
    hudItem: {
      marginRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightLight,
      fontSize: theme.typography.subtitle2.fontSize,
    },
    body: {
      marginTop: theme.spacing(0.5),
    },
    actions: {
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(-0.2),
      marginLeft: theme.spacing(-0.5), //! magic number, comes from arrow svg image shape
    },
    commentIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default CommentView;
