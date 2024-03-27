"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// datastore.test.ts
const datastore = __importStar(require("../datastore"));
describe('File Management', () => {
    it('should add a file and retrieve it by ID', () => {
        const fileId = datastore.addFile('test.txt', 'txt', 'Test file content');
        const file = datastore.getFileById(fileId);
        expect(file).toBeDefined();
        expect(file === null || file === void 0 ? void 0 : file.name).toBe('test.txt');
        expect(file === null || file === void 0 ? void 0 : file.format).toBe('txt');
        expect(file === null || file === void 0 ? void 0 : file.content).toBe('Test file content');
    });
    it('should add a received file and retrieve its content', () => {
        const fileId = datastore.addFile('test.txt', 'txt', 'Test file content');
        datastore.addReceivedFile(fileId, 'Received file content');
        const receivedContent = datastore.getReceivedFileContent(fileId);
        expect(receivedContent).toBe('Received file content');
    });
    it('should return all possible files', () => {
        const files = datastore.getAllPossibleFiles();
        expect(files.length).toBeGreaterThan(0);
    });
    it('should check internal sending', () => {
        const fileId = datastore.addFile('test.txt', 'txt', 'Test file content');
        datastore.addReceivedFile(fileId, 'Test file content');
        const internalSending = datastore.checkInternalSending(fileId);
        expect(internalSending).toBe(true);
    });
});
describe('User Management', () => {
    it('should add a user and retrieve it by email', () => {
        datastore.addUser('test@example.com', 'password');
        const user = datastore.getUserByEmail('test@example.com');
        expect(user).toBeDefined();
        expect(user === null || user === void 0 ? void 0 : user.email).toBe('test@example.com');
        expect(user === null || user === void 0 ? void 0 : user.password).toBe('password');
    });
    it('should delete a user by email', () => {
        datastore.deleteUserByEmail('test@example.com');
        const user = datastore.getUserByEmail('test@example.com');
        expect(user).toBeUndefined();
    });
    it('should return all users', () => {
        const users = datastore.getAllUsers();
        expect(users.length).toBe(0); // Since we deleted the user in the previous test
    });
});
describe('Notification Management', () => {
    it('should add a notification and retrieve all notifications', () => {
        const fileId = datastore.addFile('test.txt', 'txt', 'Test file content');
        datastore.addNotification(fileId, 'File processed successfully');
        const notifications = datastore.getNotifications();
        expect(notifications.length).toEqual(expect.any(Number));
        expect(notifications[0].message).toBe('File processed successfully');
    });
});
