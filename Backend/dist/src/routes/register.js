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
// routes/register.ts
const express_1 = __importDefault(require("express"));
const datastore_1 = require("../datastore");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Registration logic
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    // Check password length
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    // Check if user already exists
    if ((0, datastore_1.getUserByEmail)(email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Create new user
    (0, datastore_1.addUser)(email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
}));
exports.default = router;
