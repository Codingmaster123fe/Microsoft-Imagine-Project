// Config for different environments
const config = {
  development: {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/educonnect',
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_key_change_in_production',
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    logLevel: 'debug',
    corsOrigin: 'http://localhost:3000',
  },
  production: {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: '7d',
    logLevel: 'error',
    corsOrigin: process.env.CLIENT_URL,
  },
  test: {
    port: 5001,
    mongoUri: 'mongodb://localhost:27017/educonnect_test',
    jwtSecret: 'test_secret',
    jwtExpire: '1h',
    logLevel: 'error',
    corsOrigin: 'http://localhost:3000',
  },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
