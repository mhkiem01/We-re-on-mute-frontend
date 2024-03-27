"use strict";
// startServer.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import configuration info such as what port to use
const config_json_1 = __importDefault(require("./config.json"));
const PORT = parseInt(process.env.PORT || config_json_1.default.port);
const HOST = process.env.IP || 'localhost';
const startServer = (app) => {
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on port ${PORT} at ${HOST}`);
    });
};
exports.default = startServer;
