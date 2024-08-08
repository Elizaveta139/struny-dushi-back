import multer from 'multer';
import path from 'path';

const uploadsDir = path.resolve('uploads');

// const storage = multer.diskStorage({
//   destination: uploadsDir,
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Путь к папке для сохранения файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Уникальное имя файла
  },
});

export const uploadPdf = multer({ storage });

// const upload = multer({ storage });

// export const uploadPdf = upload.single('fileURL');
