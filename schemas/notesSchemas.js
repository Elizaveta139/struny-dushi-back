import Joi from 'joi';

export const createNotesSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).required(),
});

export const updateNotesSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
