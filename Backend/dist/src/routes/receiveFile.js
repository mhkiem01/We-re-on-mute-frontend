"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/receiveFile.ts
const express_1 = __importDefault(require("express"));
const datastore_1 = require("../datastore");
const router = express_1.default.Router();
router.post('/', (req, res) => {
    const { name, format, content, message } = req.body;
    // Check if all required fields are provided
    if (!name || !format || !content || !message) {
        return res.status(400).json({ message: 'Name, format, content, and message are required' });
    }
    // Add file to datastore
    const fileId = (0, datastore_1.addFile)(name, format, content);
    // Add notification
    (0, datastore_1.addNotification)(fileId, message);
    res.status(200).json({ message: 'File received internally and notification added successfully' });
});
exports.default = router;
