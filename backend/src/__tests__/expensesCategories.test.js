const request = require('supertest');
const app = require('../../index');

describe('Endpoint: /expensesCategories', () => {
  test('should return 200 for that endpoint', async () => {
    const response = await request(app).get('/expensesCategories');
    expect(response.status).toBe(200);
  });

  test('should have valid data types', async () => {
    const response = await request(app).get('/expensesCategories');
    response.body.forEach((category) => {
      expect(typeof category._id).toBe('string');
      expect(typeof category.name).toBe('string');
      expect(typeof category.image).toBe('string');
      expect(typeof category.color).toBe('string');
      expect(typeof category.__v).toBe('number');
    });
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
});
