// datastore.ts

import fs from 'fs';

export interface User {
    name: string;
    email: string;
    password: string;
    sentFiles: string[];
    receivedFiles: string[];
}

export interface File {
  id: string;
  name: string;
  format: string;
  path: string;
  sender: string;
  recipient?: string;
  timestamp: Date;
}

export interface Notification {
    fileId: string;
    recipient: string;
    message: string;
}

export interface DataStore {
    users: { [key: string]: User };
    files: File[];
    notifications: Notification[];
}

export let data: DataStore = {
  users: {},
  files: [],
  notifications: [],
};
// Use getData() to access the data
export function getData() {
  const dataString = fs.readFileSync('src/data.json');
  data = JSON.parse(String(dataString)) as DataStore;
}

// Use setData(newData) to pass in the entire data object, with modifications made
export function setData(newData: DataStore) {
  const dataString = JSON.stringify(newData, null, 2);
  fs.writeFileSync('src/data.json', dataString);
}


export const getSentFiles = (senderEmail: string): File[] => {
  return data.files.filter(file => file.sender === senderEmail);
};

export const getReceivedFiles = (recipientEmail: string): File[] => {
  return data.files.filter(file => file.recipient === recipientEmail);
};

export const getNotificationsForUser = (recipientEmail: string): Notification[] => {
  return data.notifications.filter(notification => notification.recipient === recipientEmail);
};

export const getFileById = (fileId: string): File | undefined => {
  return data.files.find(file => file.id === fileId);
};

export const getAllPossibleFiles = (): File[] => {
  return data.files;
};

export const checkInternalSending = (fileId: string): boolean => {
  const receivedContent = getReceivedFileContent(fileId);
  if (!receivedContent) return false;

  const possibleFile = getFileById(fileId);
  if (!possibleFile) return false;

  return receivedContent === possibleFile.content;
};

export const addNotification = (fileId: string, message: string): void => {
  data.notifications.push({ fileId, message });
  setData(data);
};

export const getNotifications = (): notification[] => {
  return data.notifications;
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export const addUser = (name: string, email: string, password: string): void => {
  data.users[email] = { name, email, password };
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
  data.notifications = [];

  setData(data);
};
