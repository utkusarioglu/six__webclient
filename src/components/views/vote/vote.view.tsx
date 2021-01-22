import type { FC } from 'react';
import type { VoteViewProps } from './vote.view.types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const VoteView: FC<VoteViewProps> = ({ voteCount }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.vote}>
      <Grid item>
        <IconButton aria-label="delete">
          <ArrowDropUpIcon />
          <Typography>{voteCount}</Typography>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton aria-label="delete">
          <ArrowDropDownIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const useStyles = makeStyles({
  vote: {
    width: 'max-content',
    // width: 30,
  },
});

export default VoteView;
