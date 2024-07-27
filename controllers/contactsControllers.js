import HttpError from '../helpers/HttpError.js';
import { Notes } from '../models/notesModel.js';

export const getAllNotes = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const filters = { owner };

  if (favorite !== null) {
    filters.favorite = favorite;
  }

  const result = await Notes.find(filters, '-createdAt -updatedAt', { skip, limit }).populate(
    'owner',
    'email subscription'
  );
  res.status(200).json(result);
};

export const getOneNotes = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Notes.findOne({ owner, _id: id });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

export const deleteNotes = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Notes.findByIdAndDelete({ owner, _id: id });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

export const createNotes = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Notes.create({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateNotes = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Body must have at least one field');
  }

  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Notes.findByIdAndUpdate(id, { ...req.body, owner }, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

export const updateStatusNotes = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Notes.findByIdAndUpdate(id, { ...req.body, owner }, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};
