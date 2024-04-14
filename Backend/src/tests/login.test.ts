import request from 'supertest';
import app from '../main';
import jwt from 'jsonwebtoken';

describe('POST /login', () => {
  let token: string;

  beforeAll(async () => {
    await request(app)
      .post('/register')
      .send({
        Name: 'John Doe',
        email: 'test@example.com',
        password: 'password'
      });
  });

  it('should login a user with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('email', 'test@example.com');

    token = response.body.token;
  });

  it('should return 401 if email or password is incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'wrong-password'
      });

    expect(response.status).toBe(401);
  });

  it('should return 401 if password is incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'wrong-password'
      });

    expect(response.status).toBe(401);
  });

  it('should return 401 if email is wrong', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password'
      });

    expect(response.status).toBe(401);
  });

  it('should return 400 if password is not provided', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
      });

    expect(response.status).toBe(400);
  });

  it('should return a valid JWT token on successful login', async () => {
    expect(token).toBeTruthy();

    const decodedToken: any = jwt.verify(token, 'secret');
    expect(decodedToken).toHaveProperty('userId', 'test@example.com');
  });
});
