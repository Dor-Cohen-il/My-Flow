const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"expense"
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

module.exports = mongoose.model('Expense', expenseSchema)