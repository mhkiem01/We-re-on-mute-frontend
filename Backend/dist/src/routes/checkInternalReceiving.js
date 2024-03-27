"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/checkInternalReceiving.ts
const express_1 = __importDefault(require("express"));
const datastore_1 = require("../datastore");
const router = express_1.default.Router();
router.get('/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    // Check if the invoice is received internally correctly
    const isReceivedCorrectly = (0, datastore_1.checkInternalSending)(fileId);
    if (isReceivedCorrectly) {
        res.status(200).json({ message: 'File is received internally correctly' });
    }
    else {
        res.status(400).json({ message: 'File is not received internally correctly' });
    }
});
exports.default = router;
