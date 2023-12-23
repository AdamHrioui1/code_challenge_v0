const Customer = require("../models/customerModel")
const User = require("../models/userModel")

const UserCtrl = {
    create: async (req, res) => {
        try {
            const { name, sector, agreeToTerms } = req.body
            if(name.length === 0) return res.status(500).json({ success: false, msg: 'Please enter your name!' })
            if(sector.length === 0) return res.status(500).json({ success: false, msg: 'Please enter a sector!' })
            if(!agreeToTerms) return res.status(500).json({ success: false, msg: 'You have to agree to the terms!' })

            const user = new User({
                name, sector, agreeToTerms,
                customerId: req.user.id
            })

            await user.save()
            return res.status(200).json({ success: true, data: user })

        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    readAll: async (req, res) => {
        try {
            const customer = await Customer.findById({ _id: req.user.id })
            if(customer.role !== 'admin') {
                const users = await User.find({ customerId: req.user.id })
                return res.status(200).json({ success: true, data: users })
            }

            const users = await User.find()
            return res.status(200).json({ success: true, data: users })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            
            const user = await User.findById({ _id: id })
            if(!user) return res.status(500).json({ success: false, msg: `There is no user with the id: ${id}`})
            
            const customer = await Customer.findById({ _id: req.user.id })
            if(customer.role !== 'admin') {
                const user = await User.findOne({ _id: id, customerId: req.user.id })
                return res.status(200).json({ success: true, data: user })
            }

            return res.status(200).json({ success: true, data: user })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name, sector, agreeToTerms } = req.body
            const { id } = req.params
            
            const customer = await Customer.findById({ _id: req.user.id })
            if(customer.role !== 'admin') {
                const user = await User.find({ _id: id, customerId: req.user.id })
                if(user) {
                    await User.findByIdAndUpdate({ _id: id }, {
                        name, sector, agreeToTerms
                    })
                    return res.status(200).json({ success: true, msg: 'User updated successfully!' })
                }

                return res.status(400).json({ success: false, msg: 'You can not update this user!' })
            }

            const user = await User.findById({ _id: id })
            if(!user) return res.status(500).json({ success: false, msg: `There is no user with the id: ${id}`})
            if(name.length === 0) return res.status(500).json({ success: false, msg: 'Please enter your name!' })
            if(sector.length === 0) return res.status(500).json({ success: false, msg: 'Please enter a sector!' })
            if(agreeToTerms !== 'true') return res.status(500).json({ success: false, msg: 'You have to agree to the terms!' })

            await User.findByIdAndUpdate({ _id: id }, {
                name, sector, agreeToTerms
            })

            return res.status(200).json({ success: true, msg: 'User updated successfully!' })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const customer = await Customer.findById({ _id: req.user.id })
            if(customer.role !== 'admin') {
                const user = await User.find({ _id: id, customerId: req.user.id })
                if(user) {
                    await User.findByIdAndDelete({ _id: id })
                    return res.status(200).json({ success: true, msg: 'User deleted successfully!' })
                }

                return res.status(400).json({ success: false, msg: 'You can not delete this user!' })
            }
            
            await User.findByIdAndDelete({ _id: id })
            return res.status(200).json({ success: true, msg: 'User deleted successfully!' })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
}

module.exports = UserCtrl