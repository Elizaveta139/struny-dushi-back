import express from 'express';
import {
  getAllNotes,
  getOneNotes,
  deleteNotes,
  createNotes,
  updateNotes,
  updateStatusNotes,
  favoritesNotes,
} from '../controllers/notesControllers.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { cntrlWrapper } from '../helpers/cntrlWrapper.js';

import {
  createNotesSchema,
  updateNotesSchema,
  updateFavoriteSchema,
} from '../schemas/notesSchemas.js';

const notesRouter = express.Router();

notesRouter.get('/', cntrlWrapper(getAllNotes));

notesRouter.get('/favorites', authenticate, cntrlWrapper(favoritesNotes));

notesRouter.get('/:id', isValidId, cntrlWrapper(getOneNotes));

notesRouter.delete('/:id', authenticate, isValidId, cntrlWrapper(deleteNotes));

notesRouter.post('/', authenticate, validateBody(createNotesSchema), cntrlWrapper(createNotes));

notesRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateNotesSchema),
  cntrlWrapper(updateNotes)
);

notesRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  cntrlWrapper(updateStatusNotes)
);

export default notesRouter;
