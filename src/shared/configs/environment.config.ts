export interface EnvironmentConfig {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwt: {
    secret: string;
    accessTokenExpirationTime: string;
    refreshTokenExpirationTime: string;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    defaultFrom: string;
    secure: boolean;
  };
  redis: {
    host: string;
    port: number;
    password: string;
  };
}

export const defaultConfig: EnvironmentConfig = {
  port: 3000,
  nodeEnv: 'development',
  databaseUrl:
    'postgresql://postgres:password@localhost:5432/db-dev?schema=public',
  jwt: {
    secret: 'your-secret-key',
    accessTokenExpirationTime: '7d',
    refreshTokenExpirationTime: '30d',
  },
  mail: {
    host: 'smtp.gmail.com',
    port: 587,
    user: '',
    password: '',
    defaultFrom: 'noreply@wms.com',
    secure: false,
  },
  redis: {
    host: 'localhost',
    port: 6379,
    password: '',
  },
};

export const environmentConfig = (): EnvironmentConfig => ({
  port: parseInt(process.env.PORT || `${defaultConfig.port}`, 10),
  nodeEnv: process.env.NODE_ENV || defaultConfig.nodeEnv,
  databaseUrl: process.env.DATABASE_URL || defaultConfig.databaseUrl,
  jwt: {
    secret: process.env.JWT_SECRET || defaultConfig.jwt.secret,
    accessTokenExpirationTime:
      process.env.ACCESS_TOKEN_EXPIRATION_TIME ||
      defaultConfig.jwt.accessTokenExpirationTime,
    refreshTokenExpirationTime:
      process.env.REFRESH_TOKEN_EXPIRATION_TIME ||
      defaultConfig.jwt.refreshTokenExpirationTime,
  },
  mail: {
    host: process.env.MAIL_HOST || defaultConfig.mail.host,
    port: parseInt(
      process.env.MAIL_PORT || String(defaultConfig.mail.port),
      10,
    ),
    user: process.env.MAIL_USER || defaultConfig.mail.user,
    password: process.env.MAIL_PASSWORD || defaultConfig.mail.password,
    defaultFrom: process.env.MAIL_FROM || defaultConfig.mail.defaultFrom,
    secure: process.env.MAIL_SECURE === 'true' || defaultConfig.mail.secure,
  },
  redis: {
    host: process.env.REDIS_HOST || defaultConfig.redis.host,
    port: parseInt(
      process.env.REDIS_PORT || String(defaultConfig.redis.port),
      10,
    ),
    password: process.env.REDIS_PASSWORD || defaultConfig.redis.password,
  },
});
