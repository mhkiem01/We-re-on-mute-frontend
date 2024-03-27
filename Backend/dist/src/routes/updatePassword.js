"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/updatePassword.ts
const express_1 = __importDefault(require("express"));
const datastore_1 = require("../datastore");
const router = express_1.default.Router();
router.put('/', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    // Check if all required fields are provided
    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Email, currentPassword, and newPassword are required' });
    }
    // Check if the user exists
    const user = (0, datastore_1.getUserByEmail)(email);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    // Check if the current password matches the user's password
    if (user.password !== currentPassword) {
        return res.status(401).json({ message: 'Current password is incorrect' });
    }
    // Update user's password in the datastore
    (0, datastore_1.updateUserPassword)(email, newPassword);
    // Respond with success message
    res.status(200).json({ message: 'Password updated successfully' });
});
exports.default = router;
