import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const noteSchema = new Schema(
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

noteSchema.post('save', handleMongooseError);

export const Contact = model('note', noteSchema);
