// routes/sendInvoiceByEmail.ts
import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { toEmail, xmlData, fromEmail, fromPassword } = req.body;

  // Check if email and XML data are provided
  if (!toEmail || !xmlData || !fromEmail || !fromPassword) {
    return res.status(400).json({ message: 'Recipient email and invoice file are required' });
  }

  // Set up Nodemailer
  const transporter = nodemailer.createTransport({
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
  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: 'Invoice sent successfully' });
});

export default router;
