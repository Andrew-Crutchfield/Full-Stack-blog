import { Router, Request, Response } from 'express';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY as string,
});

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { recipient, subject, message } = req.body;
  if (!recipient || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  const emailData = {
    from: process.env.MAILGUN_SENDER as string,
    to: recipient,
    subject: subject,
    text: message,
  };
  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN as string, emailData);
    res.status(200).json({ success: true, message: 'Email sent successfully!', id: response.id });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error });
  }
});

export default router;