declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    TOKEN_EXPIRATION: string;
    TOKEN_SECRET: string;
  }
}
