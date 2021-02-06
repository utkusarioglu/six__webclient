import { useState, useEffect, ReactNode, useMemo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    // '& > * + *': {
    //   marginBottom: theme.spacing(3),
    // },
  },
  snackbar: {
    bottom: theme.spacing(3),
  },
}));

export interface SnackbarMessage {
  message: string;
  key: number;
  actions: ReactNode;
}

export interface State {
  open: boolean;
  snackPack: SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

function isAtDisabledPath(): boolean {
  switch (window.location.pathname.slice(1)) {
    case 'login':
    case 'signup':
    case 'profile':
    case 'settings':
      return true;

    default:
      return false;
  }
}

function StartupSnacksView() {
  const classes = useStyles();
  const disableSnacks = isAtDisabledPath();

  const [open, setOpen] = useState(true);
  const [skipCookieConsent, setSkipCookieConsent] = useState(false);
  const [skipLoginSnack, setSkipLoginSnack] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  const snackPack: SnackbarMessage[] = useMemo(
    () => [
      {
        message:
          'This website uses cookies to serve you with content that is curated to your taste. Please click allow to enable this amazing feature',
        key: 0,
        actions: (
          <>
            <Button
              color="primary"
              size="small"
              onClick={() => {
                setSkipCookieConsent(true);
                setOpen(false);
              }}
            >
              Decline
            </Button>
            <Button
              color="primary"
              size="small"
              onClick={() => {
                Cookies.set('cookies-consented', 'true');
                setOpen(false);
              }}
            >
              Allow
            </Button>
          </>
        ),
      },
      {
        message:
          'Login to customize your feed, follow any of the thousands of communities and swear at people for no reason',
        key: 1,
        actions: (
          <>
            <Button
              color="primary"
              size="small"
              variant="text"
              onClick={() => {
                setSkipLoginSnack(true);
                setOpen(false);
              }}
            >
              Maybe later
            </Button>
            <Button
              color="primary"
              size="small"
              component={domLinkHelper('/signup')}
              onClick={() => {
                setSkipLoginSnack(true);
                setOpen(false);
              }}
            >
              Sign up
            </Button>
            <Button
              component={domLinkHelper('/login')}
              color="primary"
              size="small"
              onClick={() => {
                setSkipLoginSnack(true);
                setOpen(false);
              }}
            >
              Login
            </Button>
          </>
        ),
      },
      {
        message: 'third',
        key: 2,
        actions: (
          <Button color="primary" size="small">
            something
          </Button>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const cookiesAllowed =
      Cookies.getJSON('cookies-consented') || false || skipCookieConsent;

    const loggedIn =
      Cookies.getJSON('logged-in') ||
      false ||
      skipCookieConsent ||
      skipLoginSnack;

    let snackPosition = [cookiesAllowed, loggedIn].indexOf(false);
    snackPosition = disableSnacks ? -1 : snackPosition;

    if (snackPosition !== -1) {
      setOpen(true);
      setMessageInfo(snackPack[snackPosition]);
    } else {
      setOpen(false);
    }
  }, [
    messageInfo,
    open,
    snackPack,
    skipCookieConsent,
    skipLoginSnack,
    disableSnacks,
  ]);

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={messageInfo ? messageInfo.actions : undefined}
      />
    </div>
  );
}

export default StartupSnacksView;
