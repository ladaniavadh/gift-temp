const mongoose = require('mongoose')
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    productUuid: {
        type: String,
        required: true
    },
    boxId: {
        type: String
    },
    isValid: {
        type: Boolean,
    },
    imgUrl: {
        type: String,
    },
    owner: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {
    collection: "product",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const gift = mongoose.model('product', productSchema)

module.exports = {
    gift,
}