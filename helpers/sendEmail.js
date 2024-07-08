import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import pug from 'pug';
import path from 'path';
import { convert } from 'html-to-text';

dotenv.config();

const { META_PASSWORD } = process.env;

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'elizavetar@meta.ua',
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendEmail = async (data, url) => {
  const html = pug.renderFile(path.join(process.cwd(), 'views', 'emails.pug'), { url: url });
  const email = {
    ...data,
    from: 'elizavetar@meta.ua',
    html,
    text: convert(html),
  };
  await transporter.sendMail(email);
  return true;
};
