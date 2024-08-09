import Joi from 'joi';

import { enumCategory } from '../helpers/schemeSettings.js';

export const createNotesSchema = Joi.object({
  title: Joi.string().required(),
  // fileURL: Joi.valid('application/pdf').required(),
  // fileURL: Joi.string().uri().required(),
  category: Joi.string().valid(...enumCategory),
});

export const updateNotesSchema = Joi.object({
  title: Joi.string(),
  fileURL: Joi.string().valid('application/pdf'),
  category: Joi.string().valid(...enumCategory),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
