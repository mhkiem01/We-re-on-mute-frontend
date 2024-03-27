import request from 'supertest';
import app from '../main';
import { clearData } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('POST /sendFileInternally', () => {
  it('should send a file internally and add a notification', async () => {
    const response = await request(app)
      .post('/sendFileInternally')
      .send({
        name: 'testFile',
        format: 'txt',
        content: 'This is a test file',
        message: 'File sent internally successfully'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'File sent internally and notification added successfully');
  });

  it('should return 400 if name or format is missing', async () => {
    const response = await request(app)
      .post('/sendFileInternally')
      .send({
        content: 'This is a test file',
        message: 'File sent internally successfully'
      });

    expect(response.status).toBe(400);
  });
});
