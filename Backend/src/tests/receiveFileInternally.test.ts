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

    await request(app).post('/register').send(sender);

    const recipient = {
      name: 'Recipient',
      email: 'recipient@example.com',
      password: 'password',
    };
    await request(app).post('/register').send(recipient);

    await request(app)
      .post('/sendFileInternally')
      .attach('file', './src/example1.xml') // Path to the test file you want to upload
      .field('name', 'TestFile')
      .field('format', 'xml')
      .field('path', './src/example1.xml')
      .field('senderEmail', 'sender@example.com')
      .field('recipientEmail', 'recipient@example.com');

    const recipientEmail = recipient.email;

    const response = await request(app)
      .post('/receiveFile')
      .send({ recipientEmail });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});
