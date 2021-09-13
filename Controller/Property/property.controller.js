/** @format */

const { Property } = require('../../Models/Property');

const { removeVietnameseTones } = require('../../Helpers');

const viewProperties = (req, res) => {
  const { keyword, minPrice, maxPrice } = req.query;
  Property.find({
    name: { $regex: keyword, $options: 'i' },
    price: { $gte: minPrice, $lte: maxPrice },
  })
    .then((property) => {
      res.status(200).json(property);
    })
    .catch((err) => res.status(400).json(err));
};

const createProperty = (req, res) => {
  const { name, address } = req.body;

  const newProperty = new Property({
    ...req.body,
    name: removeVietnameseTones(name),
    address: removeVietnameseTones(address),
  });

  newProperty
    .save()
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => res.status(400).json(err));
};

const editProperty = (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  const payload = {
    ...req.body,
    name: removeVietnameseTones(name),
    address: removeVietnameseTones(address),
  };

  Property.findByIdAndUpdate(id, payload, { new: true })
    .then(() => res.status(204).json())
    .catch((err) => res.json(err));
};

const deleteProperty = (req, res) => {
  const { id } = req.params;

  Property.deleteOne({ _id: id })
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  viewProperties,
  createProperty,
  editProperty,
  deleteProperty,
};
