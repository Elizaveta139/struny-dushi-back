import multer from 'multer';
import path from 'path';

const uploadsDir = path.resolve('uploads');

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadPdf = multer({
  storage: storage,
});

// const upload = multer({ storage });

// export const uploadPdf = upload.single('fileURL');
