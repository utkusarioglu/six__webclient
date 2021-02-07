import type { FC } from 'react';
import type { VoteViewProps } from './vote.view.types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withUnit } from '_helpers/withUnit/withUnit';

const VoteView: FC<VoteViewProps> = ({
  likeCount,
  dislikeCount,
  voteCount,
  voteFunction,
  mode,
}) => {
  const classes = useStyles();

  const tooltipTitle = [
    withUnit(likeCount, 'like'),
    withUnit(dislikeCount, 'dislike'),
  ].join(', ');

  return (
    <Tooltip title={tooltipTitle} data-testid="tooltip">
      <Grid container className={classes.vote}>
        <Grid item>
          <IconButton
            aria-label="up vote"
            onClick={() => voteFunction(1)}
            size="small"
            edge="start"
          >
            {mode === 'post' ? (
              <ArrowDropUpIcon />
            ) : (
              <KeyboardArrowUpOutlinedIcon />
            )}
            <Typography data-testid="vote-count">{voteCount}</Typography>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="down vote"
            onClick={() => voteFunction(-1)}
            size="small"
          >
            {mode === 'post' ? (
              <ArrowDropDownIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
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

export default VoteView;
