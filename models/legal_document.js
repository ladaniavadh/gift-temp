const mongoose = require('mongoose')
const Joi = require('joi');

const legalDocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // type: String,
        // required: true
    },
    docUrl: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {
    collection: "legal_document",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const gift = mongoose.model('legal_document', legalDocumentSchema)

module.exports = {
    gift,
}