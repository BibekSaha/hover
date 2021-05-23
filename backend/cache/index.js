const redis = require('redis');
const { 
  REDIS_PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_DB 
} = process.env;

module.exports = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  db: REDIS_DB
});