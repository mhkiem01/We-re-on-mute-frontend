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
// routes/login.ts
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const datastore_1 = require("../datastore");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    // Check if user exists
    const user = (0, datastore_1.getUserByEmail)(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Check password
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Create and send JWT token
    const token = jsonwebtoken_1.default.sign({ userId: email }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token, email });
}));
exports.default = router;
