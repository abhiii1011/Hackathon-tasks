const request = require('supertest');
const app = require('../server');

describe('Weather route param validation', () => {
  test('current without params returns 400', async () => {
    const res = await request(app).get('/api/weather/current');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Provide either/);
  });
  test('forecast without params returns 400', async () => {
    const res = await request(app).get('/api/weather/forecast');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Provide either/);
  });
});
