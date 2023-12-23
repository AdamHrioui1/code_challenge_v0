const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    sector: {
        type: String,
        required: [true, 'Please enter the sector!'],
    },
    agreeToTerms: {
        type: Boolean,
        required: [true, 'You have to agree to terms to save your data!'],
        default: false,
    },
    customerId: {
        type: String,
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User