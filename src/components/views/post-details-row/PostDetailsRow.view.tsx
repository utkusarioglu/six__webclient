import type { FC } from 'react';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Timeago from 'react-timeago';
import { AsSkeleton } from '_base/@types/material-ui';
import type { PostExpanded } from '_slices/posts/posts.slice.types';

type PostTopRowViewProps = AsSkeleton &
  Pick<
    PostExpanded,
    | 'communityUrl'
    | 'communityStylizedUrl'
    | 'createdAt'
    | 'creatorUrl'
    | 'creatorStylizedUrl'
  >;

const PostDetailsRowView: FC<PostTopRowViewProps> = ({
  asSkeleton,
  createdAt,
  communityUrl,
  communityStylizedUrl,
  creatorUrl,
  creatorStylizedUrl,
}) => {
  const classes = useStyles();

  const CommunityLink = domLinkHelper(communityUrl);
  const PosterLink = domLinkHelper(creatorUrl);

  return (
    <Container disableGutters className={classes.root}>
      {asSkeleton ? (
        <Skeleton variant="circle">
          <Avatar className={classes.avatar} />
        </Skeleton>
      ) : (
        <Avatar className={classes.avatar}>d</Avatar>
      )}

      {asSkeleton ? (
        <Skeleton width="100%" className={classes.community} />
      ) : (
        <>
          <Link
            component={CommunityLink}
            color="textPrimary"
            className={classes.community}
          >
            {communityStylizedUrl}
          </Link>
          <Typography
            component="span"
            variant="subtitle2"
            color="textSecondary"
            className={classes.topRowDot}
          >
            •
          </Typography>
          <Typography
            component="span"
            color="textSecondary"
            className={classes.topRowText}
          >
            by
          </Typography>
          <Link
            color="textSecondary"
            className={classes.topRowText}
            component={PosterLink}
          >
            {creatorStylizedUrl}
          </Link>
          <Link color="textSecondary" className={classes.topRowText}>
            <Timeago date={createdAt} />
          </Link>
        </>
      )}
    </Container>
  );
};

export default PostDetailsRowView;

const useStyles = makeStyles((theme) => {
  const topRowFont = {
    fontWeight: theme.typography.fontWeightLight,
    fontSize: theme.typography.subtitle2.fontSize,
  };

  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    community: {
      marginLeft: theme.spacing(1),
    },
    topRowDot: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      ...topRowFont,
    },
    topRowText: {
      marginRight: theme.spacing(0.5),
      ...topRowFont,
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      // marginRight: theme.spacing(1),
    },
  });
});
