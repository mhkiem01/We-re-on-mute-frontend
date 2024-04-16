// datastore.test.ts
import * as datastore from '../datastore';

// describe('File Management', () => {
//   it('should add a file and retrieve it by ID', () => {
//     const fileId = datastore.addFile('test.txt', 'txt', '../example1.xml');
//     const file = datastore.getFileById(fileId);
//     expect(file).toBeDefined();
//     expect(file?.name).toBe('test.txt');
//     expect(file?.format).toBe('txt');
//     expect(file?.path).toBe('../example1.xml');
//   });

//   it('should add a received file and retrieve its content', () => {
//     const fileId = datastore.addFile('test.txt', 'txt', '../example1.xml');
//     datastore.addReceivedFile(fileId, 'Received file content');
//     const receivedContent = datastore.getReceivedFileContent(fileId);
//     expect(receivedContent).toBe('Received file content');
//   });

//   it('should return all possible files', () => {
//     const files = datastore.getAllPossibleFiles();
//     expect(files.length).toBeGreaterThan(0);
//   });

//   it('should check internal sending', () => {
//     const fileId = datastore.addFile('test.txt', 'txt', '../example1.xml');
//     datastore.addReceivedFile(fileId, 'Test file content');
//     const internalSending = datastore.checkInternalSending(fileId);
//     expect(internalSending).toBe(true);
//   });
// });

// describe('User Management', () => {
//   it('should add a user and retrieve it by email', () => {
//     datastore.addUser('John Doe', 'test@example.com', 'password');
//     const user = datastore.getUserByEmail('test@example.com');
//     expect(user).toBeDefined();
//     expect(user?.name).toBe('John Doe');
//     expect(user?.email).toBe('test@example.com');
//     expect(user?.password).toBe('password');
//   });

//   it('should delete a user by email', () => {
//     datastore.deleteUserByEmail('test@example.com');
//     const user = datastore.getUserByEmail('test@example.com');
//     expect(user).toBeUndefined();
//   });

//   it('should return all users', () => {
//     const users = datastore.getAllUsers();
//     expect(users.length).toBe(0); // Since we deleted the user in the previous test
//   });
// });

// describe('Notification Management', () => {
//   it('should add a notification and retrieve all notifications', () => {
//     const fileId = datastore.addFile('test.txt', 'txt', '../example1.xml');
//     datastore.addNotification(fileId, 'File processed successfully');
//     const notifications = datastore.getNotifications();
//     expect(notifications.length).toEqual(expect.any(Number));
//     expect(notifications[0].message).toBe('File processed successfully');
//   });
// });
