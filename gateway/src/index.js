const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/orders', createProxyMiddleware({ target: 'http://localhost:3001/orders', changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3002/users', changeOrigin: true }));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});