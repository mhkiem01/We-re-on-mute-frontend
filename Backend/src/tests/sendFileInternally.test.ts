import request from 'supertest';
import app from '../main';
import { clearData, addFile } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('POST /sendFileInternally', () => {
  it('should send a file internally and add a notification', async () => {
    const response = await request(app)
      .post('/sendFileInternally')
      .send({
        to: 'johndoe@gmail.com',
        subject: 'Your e-invoice',
        body: 'Here is your e-invoice',
        file: addFile('example 1', 'xml', '../example1.xml')
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'File sent internally and notification added successfully');
  });

  it('should return 400 if to, subject or body is missing', async () => {
    const response = await request(app)
      .post('/sendFileInternally')
      .send({
        to: 'johndoe@gmail.com'
      });

    expect(response.status).toBe(400);
  });
});
