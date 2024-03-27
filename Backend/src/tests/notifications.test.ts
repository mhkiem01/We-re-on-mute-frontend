import request from 'supertest';
import app from '../main';
import { addNotification, getNotifications, clearData } from '../datastore';

beforeEach(() => {
  clearData();
});

describe('GET /notifications', () => {
  beforeEach(() => {
    // Clear notifications before each test
    while (getNotifications().length > 0) {
      getNotifications().pop();
    }
  });

  it('should return empty array if no notifications are present', async () => {
    const response = await request(app).get('/notifications');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return notifications if notifications are present', async () => {
    // Add notifications
    addNotification('file1', 'Notification 1');
    addNotification('file2', 'Notification 2');

    const response = await request(app).get('/notifications');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('fileId', 'file1');
    expect(response.body[0]).toHaveProperty('message', 'Notification 1');
    expect(response.body[1]).toHaveProperty('fileId', 'file2');
    expect(response.body[1]).toHaveProperty('message', 'Notification 2');
  });
});
