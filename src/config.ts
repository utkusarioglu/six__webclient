const { REACT_APP_SERVER_PORT, REACT_APP_SECURE_SCHEMES } = process.env;

export const SERVER_PORT = +(REACT_APP_SERVER_PORT || 8080);
export const SECURE_SCHEMES =
  REACT_APP_SECURE_SCHEMES !== 'FALSE' ? true : false;

export const HTTP_SCHEME = SECURE_SCHEMES ? 'https' : 'http';

export const API_ENDPOINT = `${HTTP_SCHEME}://${window.location.host}/api`;
