/** @format */

const express = require('express');
const router = express.Router();

const property = require('./property.controller');
const { validateProperty } = require('../..//Middlewares/validation/property');
const { uploadFile } = require('../../Middlewares/uploadFiles');

router.get('/', property.viewProperties);
router.get('/:id', property.viewPropertyDetails);
router.post('/', validateProperty, property.createProperty);
router.put('/:id', validateProperty, property.editProperty);
router.delete('/:id', property.deleteProperty);
router.patch(
  '/:id/thumbnail',
  uploadFile('thumb', 'image'),
  property.changePropertyThumb
);

module.exports = router;
