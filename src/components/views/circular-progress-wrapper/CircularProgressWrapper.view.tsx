import { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface CircularProgressWrapperProps {
  isBusy: boolean;
}

const CircularProgressWrapper: FC<CircularProgressWrapperProps> = ({
  isBusy,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.submitButtonWrapper}>
      {children}
      {isBusy && (
        <CircularProgress size={24} className={classes.submitButtonProgress} />
      )}
    </div>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    submitButtonWrapper: {
      position: 'relative',
    },
    submitButtonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export default CircularProgressWrapper;
