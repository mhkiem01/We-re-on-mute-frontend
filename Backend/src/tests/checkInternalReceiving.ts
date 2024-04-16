import request from 'supertest';
import app from '../main';
import { addFile, getData, clearData } from '../datastore';
import fs from 'fs';
import path from 'path';

describe('GET /checkInternalReceiving/:fileId', () => {
  let example1FileId: string;
  beforeAll(() => {
    clearData();
    // Read the content of example1 file
    const example1FilePath = path.join(__dirname, 'example1.xml');
    const example1Content = fs.readFileSync(example1FilePath, 'utf-8');

    // Add example1 file to datastore
    example1FileId = addFile('example1', 'xml', example1Content);
  });

  it('should return 200 if file is received internally correctly', async () => {
    const response = await request(app)
      .get(`/checkInternalReceiving/${example1FileId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'File is received internally correctly');
  });

  it('should return 400 if file is not received internally correctly', async () => {
    // Assuming fileId doesn't exist in the datastore
    const fileId = 'non-existing-file-id';
    const response = await request(app)
      .get(`/checkInternalReceiving/${fileId}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'File is not received internally correctly');
  });

  it('should return 400 if fileId is missing', async () => {
    const response = await request(app)
      .get('/checkInternalReceiving/');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'File ID is missing');
  });

  it('should return 500 if fileId is invalid', async () => {
    // Assuming fileId is invalid or malformed
    const fileId = 'invalid-file-id';
    const response = await request(app)
      .get(`/checkInternalReceiving/${fileId}`);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Internal Server Error');
  });
});
