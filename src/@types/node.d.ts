declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_SERVER_EXPOSED_PORT: string; // number

      REACT_APP_SECURE_SCHEMES: 'TRUE' | 'FALSE'; // boolean

      REACT_APP_AUTH_USERNAME_LENGTH_MIN: string; // number
      REACT_APP_AUTH_USERNAME_LENGTH_MAX: string; // number
      REACT_APP_AUTH_PASSWORD_LENGTH_MIN: string; // number
      REACT_APP_AUTH_PASSWORD_LENGTH_MAX: string; // number

      REACT_APP_GA_ID: string;
    }
  }

  /**
   * Custom properties received from public/index.php
   * Note that development and production values of these properties are
   * populated by public/index.php while test values are populated by jest
   * in src/setupTest.js
   */
  interface Window {
    /** Used by redux */
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

export {};
