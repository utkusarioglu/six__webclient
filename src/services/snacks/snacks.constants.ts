import cookies from '_services/cookies/cookies';
import { SnackRecord } from '_slices/snack-keys/snack-keys.slice.types';

export const snackRecord: SnackRecord = {
  cookiePrompt: {
    alert: 'none',
    message:
      'This website uses cookies to serve you with content that is curated to your taste. Please click allow to enable this amazing feature',
    actions: [
      {
        color: 'primary',
        variant: 'text',
        text: 'Decline',
      },
      {
        color: 'primary',
        variant: 'contained',
        text: 'Allow',
        next: 'loginPrompt',
        onClick: () => {
          cookies.setCookieConsent(true);
        },
      },
    ],
  },

  loginPrompt: {
    message:
      'Login to customize your feed, follow any of the thousands of communities and swear at people for no reason',
    alert: 'none',
    actions: [
      {
        color: 'primary',
        variant: 'text',
        text: 'Maybe later',
      },
      {
        color: 'primary',
        variant: 'contained',
        text: 'Sign up',
        href: '/signup',
      },
      {
        color: 'primary',
        variant: 'contained',
        text: 'Login',
        href: '/login',
      },
    ],
  },

  restGeneralError: {
    message: 'Something went wrong, please try again',
    alert: 'error',
  },

  loginWrongUsernamePass: {
    message: 'Wrong username or password',
    alert: 'error',
  },

  commentPostError: {
    alert: 'error',
    message: 'Something went wrong while posting your comment',
  },

  visitorIllegalActionError: {
    alert: 'error',
    message: 'You cannot do this before logging in',
  },

  communitySubscribed: {
    alert: 'success',
    message: 'Subscribed',
  },

  loggedIn: {
    alert: 'success',
    message: 'Logged in, redirecting',
  },

  loggedOut: {
    alert: 'info',
    message: 'Logged out, redirecting',
  },
};
