import request from 'supertest';
import express from 'express';
import updatePasswordRouter from '../routes/updatePassword';
import * as datastore from '../datastore';

beforeEach(() => {
  datastore.clearData();
});

const app = express();
app.use(express.json());
app.use('/updatePassword', updatePasswordRouter);

describe('PUT /updatePassword', () => {
  it('should return 400 if email, currentPassword, or newPassword is missing', async () => {
    const response = await request(app)
      .put('/updatePassword')
      .send({ currentPassword: 'oldPassword', newPassword: 'newPassword' });
    expect(response.status).toBe(400);
  });

  it('should return 401 if currentPassword is incorrect', async () => {
    jest.spyOn(datastore, 'getUserByEmail').mockReturnValue(undefined);

    const response = await request(app)
      .put('/updatePassword')
      .send({ email: 'user123@example.com', currentPassword: 'wrongPassword', newPassword: 'newPassword' });
    expect(response.status).toBe(401);
  });

  it('should return 200 and update password if currentPassword is correct', async () => {
    jest.spyOn(datastore, 'getUserByEmail').mockReturnValue({ email: 'user123@example.com', password: 'oldPassword' });

    jest.spyOn(datastore, 'updateUserPassword').mockReturnValue(true);

    const response = await request(app)
      .put('/updatePassword')
      .send({ email: 'user123', currentPassword: 'oldPassword', newPassword: 'newPassword' });
    expect(response.status).toBe(200);
  });

  it('should return 500 if failed to update password', async () => {
    jest.spyOn(datastore, 'updateUserPassword').mockImplementation(() => { throw new Error(); });

    const response = await request(app)
      .put('/updatePassword')
      .send({ email: 'user123', currentPassword: 'oldPassword', newPassword: 'newPassword' });
    expect(response.status).toBe(500);
  });
});
