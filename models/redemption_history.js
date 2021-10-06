const mongoose = require('mongoose')
const Joi = require('joi');

const redemptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // type: String,
        // required: true
    },
    credit: {
        type: Number
    },
    action: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {
    collection: "redemption_history",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const gift = mongoose.model('redemption_history', redemptionSchema)

module.exports = {
    gift,
}