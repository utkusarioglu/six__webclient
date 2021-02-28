import { useState, useEffect, useMemo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import domLinkHelper from '_helpers/dom-link/DomLink.helper';
import cookies from '_services/cookies/cookies';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '_slices/user/user.slice';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackMessage, SnackMessages } from './Snacks.view.types';

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

function SnacksView() {
  const classes = useStyles();
  const disableSnacks = isAtDisabledPath();
  const isLoggedIn = useSelector(selectLoggedIn);

  const [open, setOpen] = useState(true);
  const [skipCookieConsent, setSkipCookieConsent] = useState(false);
  const [skipLoginSnack, setSkipLoginSnack] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackMessage | undefined>(
    undefined
  );

  const snackPack: SnackMessages = useMemo(
    () => [
      {
        alert: 'none',
        message:
          'This website uses cookies to serve you with content that is curated to your taste. Please click allow to enable this amazing feature',
        actions: [
          {
            color: 'primary',
            closeOnAction: true,
            variant: 'text',
            text: 'Decline',
            onClick: () => {
              setSkipCookieConsent(true);
            },
          },
          {
            color: 'primary',
            closeOnAction: true,
            variant: 'contained',
            text: 'Allow',
            onClick: () => {
              cookies.setCookieConsent(true);
            },
          },
        ],
      },
      {
        message:
          'Login to customize your feed, follow any of the thousands of communities and swear at people for no reason',
        alert: 'none',
        actions: [
          {
            color: 'primary',
            variant: 'text',
            text: 'Maybe later',
            closeOnAction: true,
            onClick: () => {
              setSkipLoginSnack(true);
            },
          },
          {
            color: 'primary',
            variant: 'contained',
            text: 'Sign up',
            href: '/signup',
            closeOnAction: true,
            onClick: () => {
              setSkipLoginSnack(true);
            },
          },
          {
            color: 'primary',
            variant: 'contained',
            text: 'Login',
            href: '/login',
            closeOnAction: true,
            onClick: () => {
              setSkipLoginSnack(true);
            },
          },
        ],
      },
      {
        alert: 'success',
        message: 'Success message',
      },
    ],
    []
  );

  useEffect(() => {
    const cookiesAllowed = cookies.getCookieConsent() || skipCookieConsent;

    const loggedIn = isLoggedIn || skipCookieConsent || skipLoginSnack;

    let snackPosition = [cookiesAllowed, loggedIn, true].indexOf(false);
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
    isLoggedIn,
  ]);

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div className={classes.root}>
      {messageInfo &&
        (messageInfo.alert === 'none' ? (
          <Snackbar
            key={'hey'}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onExited={handleExited}
            message={messageInfo.message}
            action={
              <>
                {messageInfo.actions.map(
                  ({ color, onClick, text, variant, href, closeOnAction }) => (
                    <Button
                      component={href ? domLinkHelper(href) : 'button'}
                      color={color}
                      size="small"
                      variant={variant}
                      onClick={() => {
                        closeOnAction && setOpen(false);
                        onClick();
                      }}
                    >
                      {text}
                    </Button>
                  )
                )}
              </>
            }
          />
        ) : (
          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={() => {
              handleExited();
              setOpen(false);
            }}
          >
            <MuiAlert severity={messageInfo.alert}>
              {messageInfo.message}
            </MuiAlert>
          </Snackbar>
        ))}
    </div>
  );
}

export default SnacksView;
