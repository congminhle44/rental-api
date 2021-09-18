/** @format */

const validator = require('validator');
const _ = require('lodash');
const { Property } = require('../../Models/Property');
const { removeVietnameseTones } = require('../../Helpers');

module.exports.validateProperty = async (req, res, next) => {
  let errors = {};

  const propertyId = _.get(req, 'params.id', '');
  const name = _.get(req, 'body.name', '');
  const district = _.get(req, 'body.district', '');
  const address = _.get(req, 'body.address', '');
  const type = _.get(req, 'body.type', '');
  const bedrooms = _.get(req, 'body.bedrooms', '');
  const price = _.get(req, 'body.price', '');
  const reporter = _.get(req, 'body.reporter', '');
  //   Validate courseName
  if (validator.isEmpty(name)) {
    errors.name = 'Name is required';
  }

  //   Validate courseType
  if (validator.isEmpty(address)) {
    errors.address = 'Address is required';
  } else {
    if (propertyId) {
      const property = await Property.findOne({
        _id: { $ne: propertyId },
        address: {
          $regex: removeVietnameseTones(address),
          $options: 'i',
        },
      });
      if (property)
        errors.message = 'This address was used by another property';
    } else {
      const property = await Property.findOne({
        address: {
          $regex: removeVietnameseTones(address),
          $options: 'i',
        },
      });
      if (property)
        errors.message = 'This address was used by another property';
    }
  }
  if (validator.isEmpty(district)) {
    errors.type = 'District is required';
  }

  if (validator.isEmpty(type)) {
    errors.type = 'Type is required';
  }

  if (validator.isEmpty(bedrooms)) {
    errors.bedrooms = 'Bedrooms is required';
  }

  if (validator.isEmpty(price.toString())) {
    errors.price = 'Price is required';
  }

  if (validator.isEmpty(reporter)) {
    errors.reporter = 'Reporter name is required';
  }

  if (_.isEmpty(errors)) return next(); // pass all validate
  return res.status(400).json(errors);
};
