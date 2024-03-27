import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../main';
import { addUser, clearData } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('POST /register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should return 400 if email or password is missing', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com'
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if email is invalid', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'invalid-email',
        password: 'password'
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if password is less than 6 characters', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: '12345'
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if user with the same email already exists', async () => {
    // Register a user first
    await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password'
      });

    // Try registering again with the same email
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password'
      });

    expect(response.status).toBe(400);
  });
});
