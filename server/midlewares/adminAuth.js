const Customer = require("../models/customerModel");

const adminAuth = async (req, res, next) => {
    try {
        const user = await Customer.findById({ _id: req.user.id })
        if(user.role !== 'admin') {
            return res.status(400).json({ msg: 'Page not allowed!'})
        }
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = adminAuth