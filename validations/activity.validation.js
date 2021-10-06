const Joi = require('joi');

module.exports = {

  // GET /v1/activity
  listUsers: {
    query: {
      page: Joi.number().min(1),
      size: Joi.number().min(1),
    },
  },

  // POST /v1/activity
  createActivity: {
    body: {
      title: Joi.string().required(),
      description: Joi.string(),
      banner: Joi.string(),
      created_by: Joi.string()
    },
    options: {
      allowUnknownBody: false
    }
  },
  // PATCH /v1/activity/:id
  updateUser: {
    body: {
      title: Joi.string(),
      description: Joi.string(),
      banner: Joi.string(),
    },
    params: {
      id: Joi.string()
      .required()
      .min(6)
      .max(128)
      .regex(/^[0-9a-fA-F]{24}$/).error(() => {
        return {
          message: 'Invalid userId',
        };
      }),
    },
  },
};
