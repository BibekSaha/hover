const { Redis } = require('@upstash/redis');
const { 
  REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_DB 
} = process.env;

// module.exports = redis.createClient({
//   host: REDIS_HOST,
//   port: REDIS_PORT,
//   password: REDIS_PASSWORD,
//   db: REDIS_DB
// });

module.exports = new Redis({
  url: `https://${REDIS_HOST}`,
  token: REDIS_PASSWORD,
});
