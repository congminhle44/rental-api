/** @format */

const { Property } = require('../../Models/Property');
const { Note } = require('../../Models/Note');

const viewNotes = (req, res) => {
  const { id } = req.params;
  Property.findById(id)
    .populate('notes')
    .then((property) => {
      if (!property) return Promise.reject({ message: 'Property note found' });
      res.status(200).json(property.notes);
    })
    .catch((err) => res.status(200).json(err));
};

const addNote = (req, res) => {
  const { id } = req.params;
  let _property;
  Property.findById(id)
    .then((property) => {
      if (!property)
        return Promise.reject({
          message: 'Property not found',
        });
      _property = property;
      const newNote = new Note({
        content: req.body.content,
        image: req.file ? req.file.path : '',
      });
      return newNote.save();
    })
    .then((note) => {
      _property.notes.push(note._id);
      _property.save();
      res.status(200).json(note);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  viewNotes,
  addNote,
};
