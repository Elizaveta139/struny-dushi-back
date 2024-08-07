import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import { enumCategory } from '../helpers/schemeSettings.js';

const notesSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: [true, 'Set name for contact'],
    // },
    // email: {
    //   type: String,
    // },
    // phone: {
    //   type: String,
    // },
    title: {
      type: String,
      required: [true, 'Enter a name'],
    },
    fileURL: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: enumCategory,
      default: 'На кожен день',
      // required: [true, 'Select a category'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

notesSchema.post('save', handleMongooseError);

export const Notes = model('note', notesSchema);
