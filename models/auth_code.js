const mongoose = require('mongoose')
const Joi = require('joi');

const authCodeSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    tempToken: {
        type: String
    },
    isVerified: {
        type: String,
        default: false
    },
    expireAt: {
        type: Date,
        required: true
    }
}, {
    collection: "auth_code",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const authCode = mongoose.model('auth_code', authCodeSchema)

module.exports = {
    authCode,
}