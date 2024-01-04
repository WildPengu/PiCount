const request = require('supertest');
const { app, server } = require('../../index');

describe('Endpoint: /users', () => {
  afterAll((done) => {
    server.close(done); // Zamknięcie serwera i wywołanie funkcji "done" po zakończeniu
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

  it('should add a new user', async () => {
    const newUser = {
      name: 'NewUser',
      age: 30,
      avatar: '/src/app/img/avatarsImage/jigglypuff-avatar.png',
      password: 'newpassword',
      email: 'newuser@example.com',
    };

    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('newUser');
    expect(response.body.newUser.name).toBe(newUser.name);
    expect(response.body.newUser.age).toBe(newUser.age);
    expect(response.body.newUser.avatar).toBe(newUser.avatar);
    expect(response.body.newUser.email).toBe(newUser.email);
  });
});
