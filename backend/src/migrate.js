'use strict';

const pool = require('./db');

const SQL = `
  CREATE TABLE IF NOT EXISTS items (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255)  NOT NULL,
    description TEXT          NOT NULL,
    price       NUMERIC(10,2) NOT NULL,
    category    VARCHAR(100)  NOT NULL,
    photo_url   TEXT          NOT NULL,
    status      VARCHAR(100)  NOT NULL DEFAULT 'En attente de contrôle',
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
  );
`;

async function migrate() {
  await pool.query(SQL);
  console.log('Database migration complete.');
}

module.exports = migrate;
