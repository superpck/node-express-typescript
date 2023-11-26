// https://nodemailer.com/
"use strict";

import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
    // app pasword from https://myaccount.google.com/
    // Security -> 2-step verificaiton -> App passwords
  },
});

import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  if (!req.body || !req.body.from || !req.body.to || !req.body.subject || !req.body.text){
    return res.send({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Invalid parameters'
    })
  }

  const body = req.body;
  let options = {
    from: body.from || '',
    to: body.to || '',
    subject: body.subject || '',
    text: body.text || ''
  }
  try {
    const sentResult: any = await sendMail(options).catch(console.error);
    res.json({ statusCode: StatusCodes.OK, result: sentResult.messageId });
  } catch (error) {
    res.json({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
  }
});

async function sendMail(options: any) {
  const sentResult = await transporter.sendMail(options);
  console.log("Message sent: %s", sentResult.messageId);
  return sentResult;
}

export default router;