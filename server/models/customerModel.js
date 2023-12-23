const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'This name is already exist!'],
        required: [true, "Please enter your name!"],
    },
    password: {
        type: String,
        requirted: [true, 'Please enter your password!'],
        min: 8,
    },
    role: {
        type: String,
        default: 'customer',
    },
}, {
    timestamps: true
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer