import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const notesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
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
