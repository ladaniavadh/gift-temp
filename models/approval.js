const mongoose = require('mongoose')
const Joi = require('joi');

const approvalSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    subType: {
        type: String
    },
    requestedBy: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    id: {
        type: Number,
    },
    amount: {
        type: Number,
    }
}, {
    collection: "approval",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

const Approval = mongoose.model('approval', approvalSchema)

module.exports = {
    Approval,
}