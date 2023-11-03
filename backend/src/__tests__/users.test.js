const request = require('supertest');
const app = require('../../index');

describe('Endpoint: /users', () => {
  test('Should return status 200', async () => {
    const response = await request(app).get('./users');
    expect(response.status).toBe(200);
  });

  test('Should return users with correct fields', async () => {
    const response = await request(app).get('./users');
    response.body.forEach((user) => {
      expect(user).toHaveProperty('_id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('avatar');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('age');
    });
  });
});
