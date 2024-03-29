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
const express_1 = __importDefault(require("express"));
const updatePassword_1 = __importDefault(require("../routes/updatePassword"));
const datastore = __importStar(require("../datastore"));
beforeEach(() => {
    datastore.clearData();
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/updatePassword', updatePassword_1.default);
describe('PUT /updatePassword', () => {
    it('should return 400 if email, currentPassword, or newPassword is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put('/updatePassword')
            .send({ currentPassword: 'oldPassword', newPassword: 'newPassword' });
        expect(response.status).toBe(400);
    }));
    it('should return 401 if currentPassword is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(datastore, 'getUserByEmail').mockReturnValue(undefined);
        const response = yield (0, supertest_1.default)(app)
            .put('/updatePassword')
            .send({ email: 'user123@example.com', currentPassword: 'wrongPassword', newPassword: 'newPassword' });
        expect(response.status).toBe(401);
    }));
    it('should return 200 and update password if currentPassword is correct', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(datastore, 'getUserByEmail').mockReturnValue({ email: 'user123@example.com', password: 'oldPassword' });
        jest.spyOn(datastore, 'updateUserPassword').mockReturnValue(true);
        const response = yield (0, supertest_1.default)(app)
            .put('/updatePassword')
            .send({ email: 'user123', currentPassword: 'oldPassword', newPassword: 'newPassword' });
        expect(response.status).toBe(200);
    }));
    it('should return 500 if failed to update password', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(datastore, 'updateUserPassword').mockImplementation(() => { throw new Error(); });
        const response = yield (0, supertest_1.default)(app)
            .put('/updatePassword')
            .send({ email: 'user123', currentPassword: 'oldPassword', newPassword: 'newPassword' });
        expect(response.status).toBe(500);
    }));
});
