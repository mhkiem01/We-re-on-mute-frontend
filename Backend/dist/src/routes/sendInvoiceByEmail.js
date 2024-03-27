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
// routes/sendInvoiceByEmail.ts
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { toEmail, xmlData, fromEmail, fromPassword } = req.body;
    // Check if email and XML data are provided
    if (!toEmail || !xmlData || !fromEmail || !fromPassword) {
        return res.status(400).json({ message: 'Recipient email and invoice file are required' });
    }
    // Set up Nodemailer
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail.com',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: fromEmail,
            pass: fromPassword
        }
    });
    // Compose email
    const mailOptions = {
        from: fromEmail, // Sender adress
        to: toEmail, // Recipient address
        subject: 'E-Invoice', // Subject Line
        html: '<p>Here is your E-invoice:</p>', // HTML body
        attachments: [
            {
                filename: 'E-Invoice.xml',
                path: './src/example1.xml',
                content: xmlData
            }
        ]
    };
    // Send email
    yield transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Invoice sent successfully' });
}));
exports.default = router;
