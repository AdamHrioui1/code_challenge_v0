const mongoose = require("mongoose");

const SectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the sector name!"],
    },
}, {
    timestamps: true
})

const Sector = mongoose.model('Sector', SectorSchema)

module.exports = Sector