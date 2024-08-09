import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { google } from 'googleapis';

import notesRouter from './routes/notesRouter.js';
import authRouter from './routes/authRouter.js';
import { globalErrorHandler } from './helpers/globalErrorHandler.js';

const app = express();
dotenv.config();

///////////////////
//////////////////////////////////
// шаг 1

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// const code =
//   '4/0AcvDMrBYg1oxxYlpiRPUIMTQZfdLNzE-QYJhvLBuT02OyQToG5HoeZEiCFIQI-xKGVw_NA&scope=https://www.googleapis.com/auth/drive.file';
// const authUrl = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: ['https://www.googleapis.com/auth/drive.file'],
//   redirect_uri: REDIRECT_URI,
// });

// console.log('Authorize this app by visiting this url:', authUrl);

// шаг 2 обмен на токен
// async function getToken() {
//   const { tokens } = await oauth2Client.getToken(code);
//   console.log('Access Token:', tokens.access_token);
//   console.log('Refresh Token:', tokens.refresh_token);
// }

// getToken();
//////////////////////////////////////

// MIDDLEWARE =====================
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Налаштування EJS як двигуна шаблонів
app.set('view engine', 'ejs');
//встановлюємо директорію для шаблонів EJS.
app.set('views', path.resolve('views'));

app.use('/users', authRouter);
app.use('/api/notes', notesRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(globalErrorHandler);

// app.use((err, req, res, next) => {
//   const { status = 500, message = 'Server error' } = err;
//   res.status(status).json({ message });
// });

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

export default app;
