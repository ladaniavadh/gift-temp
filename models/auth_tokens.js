const mongoose = require('mongoose')
const Joi = require('joi');

const authTokenSchema = new mongoose.Schema({
    token: {
        type: Number,
        required: true
    },
    userId: {
        // type: String
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    isVerified: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {
    collection: "auth_token",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const authToken = mongoose.model('auth_token', authTokenSchema)

module.exports = {
    authToken,
}