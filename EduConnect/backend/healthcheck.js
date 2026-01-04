const http = require('http');

/**
 * Health check endpoint
 */
const healthCheck = () => {
  const options = {
    hostname: 'localhost',
    port: process.env.PORT || 5000,
    path: '/health',
    method: 'GET',
    timeout: 5000,
  };

  const request = http.request(options, (response) => {
    console.log(`✅ Health check passed - Status: ${response.statusCode}`);
    process.exit(response.statusCode === 200 ? 0 : 1);
  });

  request.on('error', (error) => {
    console.error('❌ Health check failed:', error.message);
    process.exit(1);
  });

  request.on('timeout', () => {
    request.destroy();
    console.error('❌ Health check timeout');
    process.exit(1);
  });

  request.end();
};

healthCheck();
