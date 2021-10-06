const mongoose = require('mongoose')
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shippingAddress: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  myCredit: {
    type: Number,
    default: 0
  },
  isCustomer: {
    type: Boolean,
    // required: true
  },
  isAgent: {
    type: Boolean,
    // required: true
  },
  isAdmin: {
    type: Boolean,
    // required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  agentLevel: {
    type: Number,
  },
  profileUrl: {
    type: String,
  },
  affilatedBy: {
    type: String,
  },
  cashoutType: {
    type: String,
  }
}, {
  collection: "user",
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const User = mongoose.model('user', userSchema)

// const validateUser = async (passbook) => {
//     const schema = Joi.object({
//         otp: Joi.string().required(),
//     })
//     return schema.validate(passbook)
// }

module.exports = {
  User,
  // validateUser
}