import { createNotesSchema } from '../schemas/notesSchemas.js';

export const ValidateSheme = async (req, res) => {
  // Формирование данных для валидации
  const data = {
    title: req.body.title,
    fileURL: req.file ? req.file.path : null,
    category: req.body.category,
  };

  // Валидация данных с использованием Joi
  const { error } = createNotesSchema.validate(data);

  if (error) {
    return res.status(400).json({ error: error.details });
  }
};
