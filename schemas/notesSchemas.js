import Joi from 'joi';

import { enumCategory } from '../helpers/schemeSettings.js';

export const createNotesSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  fileURL: Joi.string().required(),
  category: Joi.string().valid(...enumCategory),
});

export const updateNotesSchema = Joi.object({
  title: Joi.string(),
  fileURL: Joi.string(),
  category: Joi.string().valid(...enumCategory),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
