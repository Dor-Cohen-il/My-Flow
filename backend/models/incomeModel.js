const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"income"
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now,
        trim: true
    },
    end_date: {
        type: Date,
        default: Date.now,
        trim: true
    },
        frequency: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxLength: 20,
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Income', IncomeSchema)