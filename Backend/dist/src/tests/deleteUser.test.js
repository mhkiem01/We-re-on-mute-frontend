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
describe('DELETE /user', () => {
    it('should delete a user with valid email', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, datastore_1.addUser)('test@example.com', 'password');
        const response = yield (0, supertest_1.default)(main_1.default)
            .delete('/user')
            .send({
            email: 'test@example.com'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
        const deletedUser = (0, datastore_1.getUserByEmail)('test@example.com');
        expect(deletedUser).toBeUndefined();
    }));
    it('should return 404 if user email is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .delete('/user')
            .send({
            email: 'nonexistent@example.com'
        });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    }));
    it('should return 400 if email is missing in request body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(main_1.default)
            .delete('/user')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email is required');
    }));
});
