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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('POST /login', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(main_1.default)
            .post('/register')
            .send({
            email: 'test@example.com',
            password: 'password'
        });
    }));
    it('should login a user with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/login')
            .send({
            email: 'test@example.com',
            password: 'password'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('email', 'test@example.com');
        token = response.body.token;
    }));
    it('should return 401 if email or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/login')
            .send({
            email: 'test@example.com',
            password: 'wrong-password'
        });
        expect(response.status).toBe(401);
    }));
    it('should return 401 if password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/login')
            .send({
            email: 'test@example.com',
            password: 'wrong-password'
        });
        expect(response.status).toBe(401);
    }));
    it('should return 401 if email is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/login')
            .send({
            email: 'nonexistent@example.com',
            password: 'password'
        });
        expect(response.status).toBe(401);
    }));
    it('should return 400 if email is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .post('/login')
            .send({
            email: 'nonexistent@example.com',
        });
        expect(response.status).toBe(400);
    }));
    it('should return a valid JWT token on successful login', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(token).toBeTruthy();
        const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
        expect(decodedToken).toHaveProperty('userId', 'test@example.com');
    }));
});
