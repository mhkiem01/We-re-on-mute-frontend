// datastore.ts

import fs from 'fs';

interface User {
    name: string;
    email: string;
    password: string;
}

interface File {
  id: string;
  name: string;
  format: string;
  path: string;
}

interface receivedFile {
    fileId: string;
    content: string;
}

interface notification {
    fileId: string;
    message: string;
}

interface DataStore {
    users: { [key: string]: User };
    files: File[];
    receivedFiles: receivedFile[];
    notifications: notification[];
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

export const addFile = (name: string, format: string, path: string): string => {
  const fileId = generateId();
  const file: File = { id: fileId, name, format, path };
  data.files.push(file);
  setData(data);

  return fileId;
};

export const getFileById = (fileId: string): File | undefined => {
  return data.files.find(file => file.id === fileId);
};

export const addReceivedFile = (fileId: string, content: string): void => {
  data.receivedFiles.push({ fileId, content });
  setData(data);
};

export const getReceivedFileContent = (fileId: string): string | undefined => {
  const receivedFile = data.receivedFiles.find(file => file.fileId === fileId);
  return receivedFile ? receivedFile.content : undefined;
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
  data.receivedFiles = [];
  data.notifications = [];

  setData(data);
};
