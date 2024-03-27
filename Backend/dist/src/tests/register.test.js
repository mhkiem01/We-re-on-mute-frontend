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
describe('POST /register', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/register')
            .send({
            email: 'test@example.com',
            password: 'password'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    }));
    it('should return 400 if email or password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/register')
            .send({
            email: 'test@example.com'
        });
        expect(response.status).toBe(400);
    }));
    it('should return 400 if email is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/register')
            .send({
            email: 'invalid-email',
            password: 'password'
        });
        expect(response.status).toBe(400);
    }));
    it('should return 400 if password is less than 6 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/register')
            .send({
            email: 'test@example.com',
            password: '12345'
        });
        expect(response.status).toBe(400);
    }));
    it('should return 400 if user with the same email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Register a user first
        yield (0, supertest_1.default)(main_1.default)
            .post('/register')
            .send({
            email: 'test@example.com',
            password: 'password'
        });
        // Try registering again with the same email
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/register')
            .send({
            email: 'test@example.com',
            password: 'password'
        });
        expect(response.status).toBe(400);
    }));
});
