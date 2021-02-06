import type { FC } from 'react';
import type { VoteViewProps } from './vote.view.types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withUnit } from '_helpers/withUnit/withUnit';
import { useSelector } from 'react-redux';
import { getPostVotes } from '_base/components/slices/post-repo/posts-repo.slice';

const PostCardVoteView: FC<VoteViewProps> = ({ postSlug }) => {
  const classes = useStyles();
  const { likeCount, dislikeCount, voteCount } = useSelector(
    getPostVotes(postSlug)
  );

  const tooltipTitle = [
    withUnit(likeCount, 'like'),
    withUnit(dislikeCount, 'dislike'),
  ].join(', ');

  return (
    <Tooltip title={tooltipTitle} data-testid="tooltip">
      <Grid container className={classes.vote}>
        <Grid item>
          <IconButton aria-label="delete">
            <ArrowDropUpIcon />
            <Typography data-testid="vote-count">{voteCount}</Typography>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete">
            <ArrowDropDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Tooltip>
  );
};

export const useStyles = makeStyles({
  vote: {
    width: 'max-content',
    display: 'flex',
    flexDirection: 'row',
    flex: 'none',
  },
});

export default PostCardVoteView;
