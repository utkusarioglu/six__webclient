const { REACT_APP_SERVER_PORT } = process.env;

export const SERVER_PORT = +(REACT_APP_SERVER_PORT || 8080);
