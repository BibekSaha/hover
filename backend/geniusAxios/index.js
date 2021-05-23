const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://api.genius.com',
  headers: {
    'Authorization': `Bearer ${process.env.GENIUS_TOKEN}`,
  }
});