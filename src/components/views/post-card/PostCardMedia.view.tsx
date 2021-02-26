import type { PostGetRes } from 'six__public-api';
import type { FC } from 'react';
import type { AsSkeleton } from '_types/material-ui';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

type PostCardMediaViewProps = AsSkeleton &
  Pick<PostGetRes['res'], 'postTitle' | 'postBody' | 'mediaImagePath'>;

const PostCardMediaView: FC<PostCardMediaViewProps> = ({
  asSkeleton,
  postTitle,
  postBody,
  mediaImagePath,
}) => {
  const classes = useStyles();

  if (asSkeleton) {
    return <Skeleton width="100%" height="100px" variant="rect" />;
  } else if (mediaImagePath) {
    return (
      <Grid item className={classes.cardActionGridItem}>
        <CardMedia
          className={classes.media}
          image={`/user-content/${mediaImagePath}`}
          title={postTitle}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item className={classes.peek}>
        <Typography variant="body2" color="textSecondary" component="p">
          {postBody}
        </Typography>
      </Grid>
    );
  }
};

export const useStyles = makeStyles((theme) =>
  createStyles({
    peek: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    media: {
      height: 140,
    },
    cardActionGridItem: {
      width: '100%',
    },
  })
);

export default PostCardMediaView;
