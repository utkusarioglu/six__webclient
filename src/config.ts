const {
  NODE_ENV: RAW_NODE_ENV,
  REACT_APP_SERVER_PORT,
  REACT_APP_SECURE_SCHEMES,
  REACT_APP_GA_ID,
} = process.env;

export const SERVER_PORT = +(REACT_APP_SERVER_PORT || 8080);
export const SECURE_SCHEMES =
  REACT_APP_SECURE_SCHEMES !== 'FALSE' ? true : false;

export const HTTP_SCHEME = SECURE_SCHEMES ? 'https' : 'http';
export const API_ENDPOINT = `${HTTP_SCHEME}://${window.location.host}/api`;
export const GA_ID = REACT_APP_GA_ID;
export const NODE_ENV = RAW_NODE_ENV;
