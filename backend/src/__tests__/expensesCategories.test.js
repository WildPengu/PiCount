const request = require('supertest');
const app = require('../../index');
const { createServer } = require('http');

let server;

describe('Endpoint: /expensesCategories', () => {
  beforeAll(() => {
    server = app.listen(3002);
  });

  test('should return 200 for that endpoint', async () => {
    const response = await request(app).get('/expensesCategories');
    expect(response.status).toBe(200);
  });

  test('should have valid data types', async () => {
    const response = await request(app).get('/expensesCategories');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          image: expect.any(String),
          color: expect.any(String),
          __v: expect.any(Number),
        }),
      ])
    );
  });

  test('should return categories with correct fields', async () => {
    const response = await request(app).get('/expensesCategories');
    expect(response.body).toHaveLength(11);
    response.body.forEach((category) => {
      expect(category).toHaveProperty('_id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('image');
      expect(category).toHaveProperty('color');
      expect(category).toHaveProperty('__v');
    });
  });

  afterAll(async () => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve(); // Zamknięcie serwera i rozwiązanie obietnicy
      });
    });
  });
});
