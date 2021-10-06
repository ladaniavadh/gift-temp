const mongoose = require('mongoose')
const Joi = require('joi');

const giftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {
    collection: "gift",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const gift = mongoose.model('gift', giftSchema)

module.exports.Gift = gift