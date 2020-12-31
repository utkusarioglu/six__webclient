declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_SERVER_EXPOSED_PORT: string; // number

      AUTH_USERNAME_LENGTH_MIN: string; // number
      AUTH_USERNAME_LENGTH_MAX: string; // number
      AUTH_PASSWORD_LENGTH_MIN: string; // number
      AUTH_PASSWORD_LENGTH_MAX: string; // number
    }
  }
}
