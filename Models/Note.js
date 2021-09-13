/** @format */

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String },
});

const Note = mongoose.model('Note', NoteSchema, 'Note');

module.exports = {
  Note,
};
