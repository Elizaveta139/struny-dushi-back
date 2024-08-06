import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import notesRouter from './routes/notesRouter.js';
import authRouter from './routes/authRouter.js';
import { globalErrorHandler } from './helpers/globalErrorHandler.js';

const app = express();
dotenv.config();

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
