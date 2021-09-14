/** @format */

const express = require('express');
const router = express.Router();

const property = require('./property.controller');
const { validateProperty } = require('../..//Middlewares/validation/property');

router.get('/', property.viewProperties);
router.get('/:id', property.viewPropertyDetails);
router.post('/', validateProperty, property.createProperty);
router.put('/:id', validateProperty, property.editProperty);
router.delete('/:id', property.deleteProperty);

module.exports = router;
