import Cookies from 'js-cookie';

class Cookie {
  private _cookieConsent = 'cookies-consented';
  private _loggedIn = 'logged-in';

  getCookieConsent(): boolean {
    return Cookies.getJSON(this._cookieConsent) || false;
  }

  setCookieConsent(hasConsented: boolean): void {
    Cookies.set(this._cookieConsent, hasConsented ? 'true' : 'false');
  }

  setLoggedIn(hasLoggedIn: boolean): void {
    Cookies.set(this._loggedIn, hasLoggedIn ? 'true' : 'false');
  }

  getLoggedIn(): boolean {
    return Cookies.getJSON(this._loggedIn) || false;
  }
}

export default new Cookie();
