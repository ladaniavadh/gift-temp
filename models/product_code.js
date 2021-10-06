const mongoose = require('mongoose')
const Joi = require('joi');

const productCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    isActive: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {
    collection: "product_code",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const gift = mongoose.model('product_code', productCodeSchema)

module.exports = {
    gift,
}