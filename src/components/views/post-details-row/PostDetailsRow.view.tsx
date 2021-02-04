import type { FC } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { darkTheme } from '_base/theme';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import Timeago from 'react-timeago';

interface PostTopRowViewProps {
  communityLinkString: string;
  posterLinkString: string;
  createdAt: string;
}

const PostDetailsRowView: FC<PostTopRowViewProps> = ({
  createdAt,
  communityLinkString,
  posterLinkString,
}) => {
  const classes = useStyles();

  const CommunityLink = domLinkHelper(communityLinkString);
  const PosterLink = domLinkHelper(posterLinkString);

  return (
    <Container disableGutters>
      <Link component={CommunityLink} color="textPrimary">
        {communityLinkString}
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
        variant="subtitle2"
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
        {posterLinkString}
      </Link>
      <Link color="textSecondary" className={classes.topRowText}>
        <Timeago date={createdAt} />
      </Link>
    </Container>
  );
};

export default PostDetailsRowView;

const useStyles = makeStyles({
  topRowDot: {
    marginLeft: darkTheme.spacing(1),
    marginRight: darkTheme.spacing(1),
  },
  topRowText: {
    marginRight: darkTheme.spacing(0.5),
  },
});
