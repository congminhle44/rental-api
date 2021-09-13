/** @format */

const express = require('express');
const router = express.Router();

const { uploadFile } = require('../../Middlewares/uploadFiles');

const note = require('./note.controller');

router.get('/:id/notes', note.viewNotes);
router.post('/:id/notes', uploadFile('image', 'image'), note.addNote);

module.exports = router;
