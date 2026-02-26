'use strict';

require('dotenv').config();

const createApp = require('./app');
const migrate = require('./migrate');

const PORT = process.env.PORT || 3000;

async function start() {
  await migrate();

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Collector backend listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
