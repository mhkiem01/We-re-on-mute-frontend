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
      .send({
        name: 'example1',
        format: 'xml',
        path: './src/example1.xml',
        senderEmail: sender.email,
        recipientEmail: recipient.email,
      });
      
      expect(response.status).toBe(200)
  });
});
