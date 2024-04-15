// datastore.ts

import fs from 'fs';

interface User {
    name: string;
    email: string;
    password: string;
    sentFiles: string[];
}

interface File {
  id: string;
  name: string;
  format: string;
  path: string;
  sender: string;
}

interface ReceivedFile {
    fileId: string;
    path: string;
    recipient: string;
}

interface Notification {
    fileId: string;
    recipient: string;
    message: string;
}

interface DataStore {
    users: { [key: string]: User };
    files: File[];
    receivedFiles: ReceivedFile[];
    notifications: Notification[];
}

let data: DataStore = {
  users: {},
  files: [],
  receivedFiles: [],
  notifications: [],
};

// const users: { [key: string]: User } = {};
// const files: File[] = [];
// const receivedFiles: receivedFile[] = [];
// const notifications: notification[] = [];

// Use getData() to access the data
export function getData() {
  const dataString = fs.readFileSync('src/data.json');
  data = JSON.parse(String(dataString)) as DataStore;
}

// Use setData(newData) to pass in the entire data object, with modifications made
function setData(newData: DataStore) {
  const dataString = JSON.stringify(newData, null, 2);
  fs.writeFileSync('src/data.json', dataString);
}

export const addFile = (name: string, format: string, path: string, senderEmail: string): string => {
  const fileId = generateId();
  const file: File = { id: fileId, name, format, path, sender: senderEmail };
  data.files.push(file);
  // Update sender's sentFiles array
  if (data.users[senderEmail]) {
      data.users[senderEmail].sentFiles.push(fileId);
  }
  setData(data);

  return fileId;
};

export const sendFile = (fileId: string, recipientEmail: string): void => {
  const file = data.files.find(file => file.id === fileId);
  if (file) {
      const receivedFile: ReceivedFile = { fileId, path: file.path, recipient: recipientEmail };
      data.receivedFiles.push(receivedFile);
      // Add notification for recipient
      const message = `You received a file (${file.name}.${file.format}) from ${data.users[file.sender].name}`;
      const notification: Notification = { fileId, recipient: recipientEmail, message };
      data.notifications.push(notification);
      setData(data);
  }
};

export const getSentFiles = (senderEmail: string): File[] => {
  return data.files.filter(file => file.sender === senderEmail);
};

export const getReceivedFiles = (recipientEmail: string): ReceivedFile[] => {
  return data.receivedFiles.filter(file => file.recipient === recipientEmail);
};

export const getNotificationsForUser = (recipientEmail: string): Notification[] => {
  return data.notifications.filter(notification => notification.recipient === recipientEmail);
};

export const getFileById = (fileId: string): File | undefined => {
  return data.files.find(file => file.id === fileId);
};

export const addReceivedFile = (fileId: string, path: string, recipient: string): void => {
  data.receivedFiles.push({ fileId, path, recipient });
  setData(data);
};

export const getReceivedFilePath = (fileId: string): string | undefined => {
  const receivedFile = data.receivedFiles.find(file => file.fileId === fileId);
  return receivedFile ? receivedFile.path : undefined;
};

export const getAllPossibleFiles = (): File[] => {
  return data.files;
};

export const checkInternalSending = (fileId: string): boolean => {
  const receivedPath = getReceivedFilePath(fileId);
  if (!receivedPath) return false;

  const possibleFile = getFileById(fileId);
  if (!possibleFile) return false;

  return receivedPath === possibleFile.path;
};

export const addNotification = (fileId: string, recipient: string, message: string): void => {
  data.notifications.push({ fileId, recipient, message });
  setData(data);
};

export const getNotifications = (): Notification[] => {
  return data.notifications;
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export const addUser = (name: string, email: string, password: string): void => {
  const sentFiles: string[] = []
  data.users[email] = { name, email, password, sentFiles };
  setData(data);
};

export const getUserByEmail = (email: string): User | undefined => {
  return data.users[email];
};

export const deleteUserByEmail = (email: string): void => {
  delete data.users[email];
  setData(data);
};

export const getAllUsers = (): User[] => {
  return Object.values(data.users);
};

export interface UpdatePasswordRequest {
  email: string;
  newPassword: string;
}

export const updateUserPassword = (email: string, newPassword: string): boolean => {
  const user = getUserByEmail(email);
  if (!user) return false;

  data.users[email].password = newPassword;
  setData(data);
  return true;
};

export const clearData = (): void => {
  // Empty all the arrays in the data structure by reassigning each array to an
  // empty array
  data.users = {};
  data.files = [];
  data.receivedFiles = [];
  data.notifications = [];

  setData(data);
};
