const mongoose = require('mongoose')
const Joi = require('joi');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  banner: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  created_by: {
    type: String,
  }
}, {
  collection: "activity",
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const Activity = mongoose.model('activity', activitySchema)

// const validateActivity = async (user) => {
//   const schema = Joi.object({
//     title: Joi.string().required(),
//     banner: Joi.string(),
//     description: Joi.string(),
//     created_by: Joi.string()
//   });
//   return schema.validate(user)
// }

module.exports = {
  Activity,
  // validateActivity
}