import request from 'supertest';
import app from '../main';
import { addUser, getUserByEmail } from '../datastore';

describe('DELETE /user', () => {
  it('should delete a user with valid email', async () => {
    addUser('test@example.com', 'password');

    const response = await request(app)
      .delete('/user')
      .send({
        email: 'test@example.com'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');

    const deletedUser = getUserByEmail('test@example.com');
    expect(deletedUser).toBeUndefined();
  });

  it('should return 404 if user email is not found', async () => {
    const response = await request(app)
      .delete('/user')
      .send({
        email: 'nonexistent@example.com'
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('should return 400 if email is missing in request body', async () => {
    const response = await request(app)
      .delete('/user')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Email is required');
  });
});
