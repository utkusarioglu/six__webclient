import type { FC } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { darkTheme } from '_base/theme';
import type { Post } from 'six__public-api';
import { makeStyles } from '@material-ui/core/styles';

type PostCardMediaViewProps = Pick<
  Post,
  'postTitle' | 'postBody' | 'mediaImagePath'
>;

const PostCardMediaView: FC<PostCardMediaViewProps> = ({
  postTitle,
  postBody,
  mediaImagePath,
}) => {
  const classes = useStyles();
  if (mediaImagePath) {
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

export const useStyles = makeStyles({
  peek: {
    marginLeft: darkTheme.spacing(2),
    marginRight: darkTheme.spacing(2),
  },
  media: {
    height: 140,
  },
  cardActionGridItem: {
    width: '100%',
  },
});

export default PostCardMediaView;
