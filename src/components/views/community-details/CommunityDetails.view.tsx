import type { FC } from 'react';
import { useEffect } from 'react';
import { clearCommunity } from '_slices/community/community.slice';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectCommunity } from '_slices/community/community.slice';
import { delayIfDev } from '_helpers/dev/delayIfDev';
import rest from '_services/rest/rest';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import CommunityJoinButtonView from '_views/community-join-button/CommunityJoinButton.view';
import { selectUser } from '_slices/user/user.slice';

interface CommunityDetailsViewProps {
  communitySlug: string;
}

const CommunityDetailsView: FC<CommunityDetailsViewProps> = ({
  communitySlug,
}) => {
  const classes = useStyles();
  const community = useSelector(selectCommunity);
  const user = useSelector(selectUser);
  const { allowView } = community;

  let asSkeleton = !allowView;

  useEffect(() => clearCommunity, []);

  if (!communitySlug) {
    // todo replace this with something that makes sense
    return <span>Something went wrong</span>;
  }

  const retrieveCommunity = () =>
    delayIfDev(() => rest.getCommunitySingle(communitySlug));

  if (!allowView) {
    retrieveCommunity();
  }

  const { name, communityUrl, ucs, id } = community;

  return (
    <>
      <div
        className={classes.communityImage}
        style={{ backgroundImage: 'url(/user-content/1.jpg)' }}
      ></div>
      <Container className={classes.titlesContainer}>
        <Grid container spacing={2}>
          {asSkeleton ? (
            <Skeleton variant="circle">
              <Avatar className={classes.avatar} />
            </Skeleton>
          ) : (
            <Avatar className={classes.avatar}>{name[0].toUpperCase()}</Avatar>
          )}
          <Grid item className={classes.titles}>
            <Typography variant="h5">
              {asSkeleton ? <Skeleton /> : name}
            </Typography>
            <Typography variant="subtitle2">
              {asSkeleton ? <Skeleton /> : communityUrl}
            </Typography>
          </Grid>
          <CommunityJoinButtonView {...{ user, ucs, id }} />
        </Grid>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      marginTop: theme.spacing(-2),
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    communityImage: {
      height: theme.spacing(15),
      width: '100%',
      backgroundSize: 'cover',
    },
    titles: {
      flexGrow: 1,
    },
    titlesContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);

export default CommunityDetailsView;
