import fs from 'fs';
import request from 'supertest';
import app from '../main';
import { clearData, addFile } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('POST /sendFileInternally', () => {
  it('should send a file internally and add a notification', async () => {
    const sender = {
      name: 'Sender',
      email: 'sender@example.com',
      password: 'password',
    };

    await request(app).post('/register').send(sender)

    const recipient = {
      name: 'Recipient',
      email: 'recipient@example.com',
      password: 'password',
    };
    await request(app).post('/register').send(recipient);

    const filePath = './src/example1.xml';
    const fileContent = fs.readFileSync(filePath);
    const response = await request(app)
      .post('/sendFileInternally')
      .field('to', 'recipient@example.com')
      .field('subject', 'Test Subject')
      .field('body', 'Test Body')
      .attach('file', fileContent, {filename: 'test-file.xml' });

      expect(response.status).toBe(200);
  });

});
