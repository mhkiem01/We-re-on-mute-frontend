import request from 'supertest';
import app from '../main';
import { clearData } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('POST /sendInvoiceByEmail', () => {
  it('should send an invoice by email', async () => {
    const response = await request(app)
      .post('/sendInvoiceByEmail')
      .send({
        toEmail: 'aanshu.varmora@outlook.com',
        xmlData: './src/example1.xml',
        fromEmail: 'aanshu.varmora@gmail.com',
        fromPassword: 'iehchhtkgpdrduxf'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Invoice sent successfully');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/sendInvoiceByEmail')
      .send({
        toEmail: 'recipient@example.com',
        fromEmail: 'sender@example.com',
        fromPassword: 'senderPassword'
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 if server error occurs', async () => {
    const response = await request(app)
      .post('/sendInvoiceByEmail')
      .send({
        toEmail: 'recipient@example.com',
        xmlData: 'path/to/invoice.xml',
        fromPassword: 'senderPassword'
      });

    expect(response.status).toBe(400);
  });
});
