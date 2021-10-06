const mongoose = require('mongoose')
const Joi = require('joi');

const transmissionSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    entityIds: {
        type: String,
        required: true
    },
    description: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {
    collection: "transmission",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const transmission = mongoose.model('transmission', transmissionSchema)

module.exports = {
    transmission,
}