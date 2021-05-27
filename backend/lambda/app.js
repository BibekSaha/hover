const express = require('express');
const serverless = require('serverless-http');

const searchRouter = require('../routes/searchRouter');
const songRouter = require('../routes/songRouter');

const app = express();

app.use('/api/v1/search', searchRouter);
app.use('/api/v1/songs', songRouter);

// 404 router handler
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `${req.originalUrl} does not exists on this server`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = (err.response && err.response.status) || 500;
  const status = statusCode === 500 ? 'fail' : 'error';
  const message = (
    err.message || 
    err.response.message || 
    'Something went wrong'
  );
  res.status(statusCode).json({
    status,
    message
  });
});

module.exports.handler = serverless(app);
