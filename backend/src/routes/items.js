'use strict';

const { Router } = require('express');
const pool = require('../db');

const router = Router();

const REQUIRED_FIELDS = ['title', 'description', 'price', 'category', 'photo_url'];

router.post('/api/items', async (req, res) => {
  const missing = REQUIRED_FIELDS.filter((f) => {
    const val = req.body[f];
    return val === undefined || val === null || val === '';
  });

  if (missing.length > 0) {
    return res.status(400).json({
      error: `Missing required field(s): ${missing.join(', ')}`,
    });
  }

  const { title, description, price, category, photo_url } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO items (title, description, price, category, photo_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, price, category, photo_url],
  );

  return res.status(201).json(rows[0]);
});

router.get('/api/items', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM items ORDER BY created_at DESC',
  );
  return res.json(rows);
});

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.get('/metrics', async (_req, res) => {
  let total_items = 0;
  let db_status = 'ok';

  try {
    const { rows } = await pool.query('SELECT COUNT(*) AS count FROM items');
    total_items = parseInt(rows[0].count, 10);
  } catch {
    db_status = 'error';
  }

  res.json({
    uptime_seconds: Math.floor(process.uptime()),
    total_items,
    db_status,
  });
});

module.exports = router;
