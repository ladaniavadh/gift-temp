const Joi = require('joi');
// const { description } = require('joi/lib/lazy');

module.exports = {
  // POST /v1/gift/create

  createGift: {
    body: {
      name: Joi.string().required(),
      number: Joi.number().required(),
      credit: Joi.number().required(),
      stock: Joi.number().required(),
      active: Joi.boolean().required(),
      description: Joi.string().required(),
      imageUrl: Joi.string().required()
    },
    options: {
      allowUnknownBody: false
    }
  },
};
