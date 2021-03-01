import { pushSnack } from '_slices/snacks/snacks.slice';
import cookies from '_services/cookies/cookies';
import ReactGa from 'react-ga';
import { GA_ID } from '_config';
import rest from '_services/rest/rest';
import { getState } from '_store/store';

/**
 * Handles events that need to happen at startup
 */
export default async function startup() {
  ReactGa.initialize(GA_ID);

  await rest.getSession();

  if (!cookies.getCookieConsent()) {
    // Cookie prompt links to login prompt through actions,
    // don't list login prompt separately
    pushSnack('cookiePrompt');
  } else if (
    getState().user.state === 'visitor' &&
    !isAtLoginPromptDisabledPath()
  ) {
    pushSnack('loginPrompt');
  }
}

function isAtLoginPromptDisabledPath(): boolean {
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
