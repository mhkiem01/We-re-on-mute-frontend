"use strict";
// datastore.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearData = exports.updateUserPassword = exports.getAllUsers = exports.deleteUserByEmail = exports.getUserByEmail = exports.addUser = exports.getNotifications = exports.addNotification = exports.checkInternalSending = exports.getAllPossibleFiles = exports.getReceivedFileContent = exports.addReceivedFile = exports.getFileById = exports.addFile = void 0;
const fs_1 = __importDefault(require("fs"));
let data = {
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
function getData() {
    const dataString = fs_1.default.readFileSync('src/data.json');
    return JSON.parse(String(dataString));
}
// Use setData(newData) to pass in the entire data object, with modifications made
function setData(newData) {
    const dataString = JSON.stringify(newData, null, 2);
    fs_1.default.writeFileSync('src/data.json', dataString);
}
const addFile = (name, format, content) => {
    data = getData();
    const fileId = generateId();
    const file = { id: fileId, name, format, content };
    data.files.push(file);
    setData(data);
    return fileId;
};
exports.addFile = addFile;
const getFileById = (fileId) => {
    data = getData();
    return data.files.find(file => file.id === fileId);
};
exports.getFileById = getFileById;
const addReceivedFile = (fileId, content) => {
    data = getData();
    data.receivedFiles.push({ fileId, content });
    setData(data);
};
exports.addReceivedFile = addReceivedFile;
const getReceivedFileContent = (fileId) => {
    data = getData();
    const receivedFile = data.receivedFiles.find(file => file.fileId === fileId);
    return receivedFile ? receivedFile.content : undefined;
};
exports.getReceivedFileContent = getReceivedFileContent;
const getAllPossibleFiles = () => {
    data = getData();
    return data.files;
};
exports.getAllPossibleFiles = getAllPossibleFiles;
const checkInternalSending = (fileId) => {
    const receivedContent = (0, exports.getReceivedFileContent)(fileId);
    if (!receivedContent)
        return false;
    const possibleFile = (0, exports.getFileById)(fileId);
    if (!possibleFile)
        return false;
    return receivedContent === possibleFile.content;
};
exports.checkInternalSending = checkInternalSending;
const addNotification = (fileId, message) => {
    data = getData();
    data.notifications.push({ fileId, message });
    setData(data);
};
exports.addNotification = addNotification;
const getNotifications = () => {
    data = getData();
    return data.notifications;
};
exports.getNotifications = getNotifications;
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
const addUser = (email, password) => {
    data = getData();
    data.users[email] = { email, password };
    setData(data);
};
exports.addUser = addUser;
const getUserByEmail = (email) => {
    data = getData();
    return data.users[email];
};
exports.getUserByEmail = getUserByEmail;
const deleteUserByEmail = (email) => {
    data = getData();
    delete data.users[email];
    setData(data);
};
exports.deleteUserByEmail = deleteUserByEmail;
const getAllUsers = () => {
    data = getData();
    return Object.values(data.users);
};
exports.getAllUsers = getAllUsers;
const updateUserPassword = (email, newPassword) => {
    const user = (0, exports.getUserByEmail)(email);
    if (!user)
        return false;
    data.users[email].password = newPassword;
    setData(data);
    return true;
};
exports.updateUserPassword = updateUserPassword;
const clearData = () => {
    data = getData();
    // Empty all the arrays in the data structure by reassigning each array to an
    // empty array
    data.users = {};
    data.files = [];
    data.receivedFiles = [];
    data.notifications = [];
    setData(data);
};
exports.clearData = clearData;
