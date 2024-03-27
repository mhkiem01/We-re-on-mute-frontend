"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const deleteUser_1 = __importDefault(require("./routes/deleteUser"));
const sendInvoiceByEmail_1 = __importDefault(require("./routes/sendInvoiceByEmail"));
const sendFileInternally_1 = __importDefault(require("./routes/sendFileInternally"));
const receiveFile_1 = __importDefault(require("./routes/receiveFile"));
const checkInternalReceiving_1 = __importDefault(require("./routes/checkInternalReceiving"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const possibleFiles_1 = __importDefault(require("./routes/possibleFiles"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/user', deleteUser_1.default);
app.use('/sendInvoiceByEmail', sendInvoiceByEmail_1.default);
app.use('/sendFileInternally', sendFileInternally_1.default);
app.use('/receiveFile', receiveFile_1.default);
app.use('/checkInternalReceiving', checkInternalReceiving_1.default);
app.use('/notifications', notifications_1.default);
app.use('/possibleFiles', possibleFiles_1.default);
exports.default = app;
