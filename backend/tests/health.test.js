'use strict';

jest.mock('../src/db');

const request = require('supertest');
const createApp = require('../src/app');

const app = createApp();

describe('GET /health', () => {
  it('returns 200 with { status: "ok" }', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /metrics', () => {
  beforeEach(() => {
    const pool = require('../src/db');
    pool.query.mockResolvedValueOnce({ rows: [{ count: '7' }] });
  });

  it('returns 200 with uptime_seconds, total_items, db_status', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      db_status: 'ok',
      total_items: 7,
    });
    expect(typeof res.body.uptime_seconds).toBe('number');
  });

  it('returns db_status "error" when pool throws', async () => {
    const pool = require('../src/db');
    pool.query.mockReset();
    pool.query.mockRejectedValueOnce(new Error('DB down'));
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.body.db_status).toBe('error');
  });
});

describe('Unknown route', () => {
  it('returns 404', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });
});
