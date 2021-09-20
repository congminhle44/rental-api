/** @format */

const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, default: 'Ho Chi Minh city' },
  type: { type: String, required: true },
  bedrooms: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  price: { type: Number, required: true },
  furnitureType: { type: String },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  reporter: { type: String, required: true },
  thumbnail: { type: String, default: 'uploads/thumbs/default-property.jpg' },
});

const Property = mongoose.model('Property', PropertySchema, 'Property');

module.exports = {
  Property,
};
