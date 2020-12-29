declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_SERVER_EXPOSED_PORT: string; // this is a number
    }
  }
}
