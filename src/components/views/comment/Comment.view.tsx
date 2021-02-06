import type { FC } from 'react';
import type { SliceComment } from '_slices/comments/comments.slice.types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Timeago from 'react-timeago';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import { createStyles, makeStyles } from '@material-ui/core/styles';

type CommentViewProps = SliceComment;

const CommentView: FC<CommentViewProps> = ({
  body,
  createdAt,
  creatorSlug,
  creatorStylizedUrl,
  creatorUrl,
  parentId,
}) => {
  const classes = useStyles();
  const CreatorLink = domLinkHelper(creatorUrl);
  const avatarSize = parentId !== null ? '25px' : '35px';

  return (
    <Paper variant="outlined" className={classes.root}>
      <Avatar
        style={{
          width: avatarSize,
          height: avatarSize,
        }}
      >
        {creatorSlug[0]}
      </Avatar>
      <Container>
        <Container disableGutters className={classes.hud}>
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
        </Container>
        <Typography className={classes.body}>{body}</Typography>
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
  })
);

export default CommentView;
