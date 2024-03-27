import request from 'supertest';
import app from '../main';
import { clearData } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('GET /possibleFiles', () => {
  it('should return 200 with an array of possible files', async () => {
    const response = await request(app)
      .get('/possibleFiles');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return an empty array if no possible files exist', async () => {
    const response = await request(app)
      .get('/possibleFiles');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
