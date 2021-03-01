import { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarAlertViewProps } from './SnackbarAlert.view.types';

const SnackbarAlertView: FC<SnackbarAlertViewProps> = ({
  open,
  currentSnack,
  onExit,
  setOpen,
}) => {
  const classes = useStyles();

  return (
    <Snackbar
      open={open}
      className={classes.snackbar}
      autoHideDuration={currentSnack.duration || 2000}
      onExited={onExit}
      onClose={() => {
        setOpen(false);
      }}
    >
      <MuiAlert severity={currentSnack.alert}>{currentSnack.message}</MuiAlert>
    </Snackbar>
  );
};

const useStyles = makeStyles((theme) => ({
  snackbar: {
    bottom: theme.spacing(2),
  },
}));

export default SnackbarAlertView;
