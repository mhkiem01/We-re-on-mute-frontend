import request from 'supertest';
import app from '../main';
import { clearData } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('POST /receiveFileInternally', () => {
  it('should receive a file internally and add notification', async () => {
    const response = await request(app)
      .post('/receiveFile')
      .send({
        name: 'testFile',
        format: 'txt',
        path: '../example1.xml',
        message: 'Test message'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'File received internally and notification added successfully');
  });

  it('should return 400 if name, format, path, or message is missing', async () => {
    const response = await request(app)
      .post('/receiveFile')
      .send({
        name: 'testFile',
        format: 'txt',
        // path and message are missing
      });

    expect(response.status).toBe(400);
  });
});
