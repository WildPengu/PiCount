const request = require('supertest');
const app = require('../../index');
const { createServer } = require('http');

let server;

describe('Endpoint: /users', () => {
  beforeAll(() => {
    server = app.listen(3001); // Rozpoczęcie serwera przed testami
  });

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

  // it('should add a new user', async () => {
  //   const newUser = {
  //     name: 'NewUser',
  //     age: 30,
  //     password: 'newpassword',
  //     email: 'newuser@example.com',
  //   };

  //   const response = await request(app).post('/users').send(newUser);
  //   expect(response.status).toBe(201);

  //   expect(response.body).toHaveProperty('newUser');
  //   expect(response.body.newUser.name).toBe(newUser.name);
  //   expect(response.body.newUser.age).toBe(newUser.age);
  //   expect(response.body.newUser.email).toBe(newUser.email);
  // });

  afterAll(async () => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve(); // Zamknięcie serwera i rozwiązanie obietnicy
      });
    });
  });
});
