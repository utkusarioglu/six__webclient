import type { FC } from 'react';
import { StoreCommunity } from '_slices/communities/communities.slice.types';
import type { AsSkeleton } from '_types/material-ui';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import { selectUser } from '_slices/user/user.slice';
import rest from '_services/rest/rest';

type CommunityCardViewProps = AsSkeleton &
  Pick<StoreCommunity, 'name' | 'description' | 'id'>;

const CommunityCardView: FC<CommunityCardViewProps> = ({
  asSkeleton,
  id,
  name,
  description,
}) => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  const subscribeOnClick = () => {
    if (user.state === 'logged-in') {
      console.log('subscribing', user.username, 'to', id);
      rest.userCommunitySubscription(user.username, id, 'subscribe');
    } else {
      alert("you aren't logged in");
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {asSkeleton ? (
          <Skeleton variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            className={classes.media}
            image="/user-content/1.jpg"
            title="Contemplative Reptile"
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {asSkeleton ? <Skeleton /> : name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {asSkeleton ? <Skeleton /> : description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        {asSkeleton ? (
          <Skeleton width="100%" variant="rect" height="30px" />
        ) : (
          <>
            <Button size="small" color="primary">
              Visit
            </Button>
            {user.state === 'logged-in' && (
              <Button size="small" color="primary" onClick={subscribeOnClick}>
                Subscribe
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CommunityCardView;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    media: {
      height: 100,
    },
  })
);
