'use strict';

const path = require('path');
const express = require('express');
const itemsRouter = require('./routes/items');

function createApp() {
  const app = express();

  app.use(express.json());

  app.use(itemsRouter);

  const frontendDir = path.resolve(__dirname, '../../frontend');
  app.use(express.static(frontendDir));

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = createApp;
