import fs from 'fs';
import request from 'supertest';
import app from '../main';
import { clearData, addFile, getUserByEmail } from '../datastore';

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

    const fileData = {
      name: 'example1',
      format: 'xml',
      path: './src/example1.xml',
      senderEmail: sender.email,
      recipientEmail: recipient.email
    };

    const response = await request(app)
      .post('/sendFileInternally')
      .attach('file', './src/example1.xml') // Path to the test file you want to upload
      .field('name', 'TestFile')
      .field('format', 'xml')
      .field('path', './src/example1.xml')
      .field('senderEmail', 'sender@example.com')
      .field('recipientEmail', 'recipient@example.com');

    // Check if the response status is 200
    expect(response.status).toBe(400);
    // Check if the response body contains the success message
    expect(response.body).toHaveProperty('message', 'File sent successfully');
    // Check if the response body contains the fileId
    expect(response.body).toHaveProperty('fileId');

  });
});
