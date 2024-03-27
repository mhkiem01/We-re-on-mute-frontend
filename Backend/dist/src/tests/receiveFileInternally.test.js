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
describe('POST /receiveFileInternally', () => {
    it('should receive a file internally and add notification', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/receiveFile')
            .send({
            name: 'testFile',
            format: 'txt',
            content: 'This is a test file',
            message: 'Test message'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'File received internally and notification added successfully');
    }));
    it('should return 400 if name, format, content, or message is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/receiveFile')
            .send({
            name: 'testFile',
            format: 'txt',
            // content and message are missing
        });
        expect(response.status).toBe(400);
    }));
});
