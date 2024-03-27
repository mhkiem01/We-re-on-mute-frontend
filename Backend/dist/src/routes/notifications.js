"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/notifications.ts
const express_1 = __importDefault(require("express"));
const datastore_1 = require("../datastore");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const notifications = (0, datastore_1.getNotifications)();
    res.status(200).json(notifications);
});
exports.default = router;
