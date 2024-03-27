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
// routes/deleteUser.ts
const express_1 = __importDefault(require("express"));
const datastore_1 = require("../datastore");
const router = express_1.default.Router();
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // Check if email is provided
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    const user = (0, datastore_1.getUserByEmail)(email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Delete User
    (0, datastore_1.deleteUserByEmail)(email);
    res.status(200).json({ message: 'User deleted successfully' });
}));
exports.default = router;
