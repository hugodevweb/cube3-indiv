'use strict';

jest.mock('../src/db');

const request = require('supertest');
const createApp = require('../src/app');

const app = createApp();

const VALID_ITEM = {
  title: 'Air Jordan 1',
  description: 'Vintage sneakers in great condition',
  price: 250.0,
  category: 'Baskets',
  photo_url: 'https://example.com/photo.jpg',
};

const CREATED_ITEM = {
  id: 1,
  ...VALID_ITEM,
  status: 'En attente de contrôle',
  created_at: '2024-01-01T00:00:00.000Z',
};

describe('POST /api/items', () => {
  it('returns 201 with the created item when all fields are valid', async () => {
    const pool = require('../src/db');
    pool.query.mockResolvedValueOnce({ rows: [CREATED_ITEM] });

    const res = await request(app).post('/api/items').send(VALID_ITEM);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: VALID_ITEM.title,
      status: 'En attente de contrôle',
    });
  });

  it('returns 400 when title is missing', async () => {
    const { title: _t, ...body } = VALID_ITEM;
    const res = await request(app).post('/api/items').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/);
  });

  it('returns 400 when photo_url is missing', async () => {
    const { photo_url: _p, ...body } = VALID_ITEM;
    const res = await request(app).post('/api/items').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/photo_url/);
  });

  it('returns 400 when description is missing', async () => {
    const { description: _d, ...body } = VALID_ITEM;
    const res = await request(app).post('/api/items').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/description/);
  });

  it('returns 400 when price is missing', async () => {
    const { price: _p, ...body } = VALID_ITEM;
    const res = await request(app).post('/api/items').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/price/);
  });

  it('returns 400 when category is missing', async () => {
    const { category: _c, ...body } = VALID_ITEM;
    const res = await request(app).post('/api/items').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/category/);
  });
});

describe('GET /api/items', () => {
  it('returns 200 with an array of items', async () => {
    const pool = require('../src/db');
    pool.query.mockResolvedValueOnce({ rows: [CREATED_ITEM] });

    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject({ title: VALID_ITEM.title });
  });

  it('returns 200 with an empty array when no items exist', async () => {
    const pool = require('../src/db');
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
