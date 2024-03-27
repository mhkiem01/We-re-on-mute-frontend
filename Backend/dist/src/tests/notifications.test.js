"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const main_1 = __importDefault(require("../main"));
const datastore_1 = require("../datastore");
beforeEach(() => {
    (0, datastore_1.clearData)();
});
describe('GET /notifications', () => {
    beforeEach(() => {
        // Clear notifications before each test
        while ((0, datastore_1.getNotifications)().length > 0) {
            (0, datastore_1.getNotifications)().pop();
        }
    });
    it('should return empty array if no notifications are present', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default).get('/notifications');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    }));
    it('should return notifications if notifications are present', () => __awaiter(void 0, void 0, void 0, function* () {
        // Add notifications
        (0, datastore_1.addNotification)('file1', 'Notification 1');
        (0, datastore_1.addNotification)('file2', 'Notification 2');
        const response = yield (0, supertest_1.default)(main_1.default).get('/notifications');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty('fileId', 'file1');
        expect(response.body[0]).toHaveProperty('message', 'Notification 1');
        expect(response.body[1]).toHaveProperty('fileId', 'file2');
        expect(response.body[1]).toHaveProperty('message', 'Notification 2');
    }));
});
