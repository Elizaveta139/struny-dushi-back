import { Notes } from '../models/notesModel.js';
import HttpError from './HttpError.js';

export const userOwnership = async (id, owner, message) => {
  // Найти запись по id
  const note = await Notes.findById(id);

  //Проверка, существует ли запись и принадлежит ли она текущему пользователю
  if (!note) {
    throw HttpError(404, 'Note not found');
  }

  if (note.owner.toString() !== owner.toString()) {
    throw HttpError(403, message);
  }

  return note;
};
