import LoginFormView from '_views/login-form/LoginForm.view';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const LoginLayout = () => {
  const classes = useStyles();

  return (
    <Grid container alignContent="center" className={classes.root}>
      <LoginFormView />
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100%',
    },
  })
);

export default LoginLayout;
