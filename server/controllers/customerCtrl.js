const Customer = require("../models/customerModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const CustomerCtrl = {
    register: async (req, res) => {
        try {
            const { name, password } = req.body
            
            if(name.length < 3) return res.status(400).json({ msg: 'The name must be at least 3 characters!'})
            if(password.length < 8) return res.status(400).json({ msg: 'Please enter a password at least 8 characters!'}) 
            
            const customer = await Customer.findOne({ name })
            if(customer) return res.status(400).json({ msg: 'This name is already token. Please choose another one!'})
            
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)
            const newCustomer = new Customer({
                name, password: hashedPassword
            })

            await newCustomer.save()
            const accesstoken = createAccessToken({ id: newCustomer._id })
            const refreshtoken = createRefreshToken({ id: newCustomer._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/customer/refreshtoken'
            })

            return res.status(200).json({ success: true, accesstoken })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { name, password } = req.body

            if(name.length < 3) return res.status(400).json({ msg: 'Please enter your name!'}) 
            const customer = await Customer.findOne({ name })
            if(!customer) return res.status(400).json({ msg: 'User not found!!' })
            if(password.length < 8) return res.status(400).json({ msg: 'Please enter a password at least 8 characters!'}) 
            
            const isMatch = await bcrypt.compare(password, customer.password)
            if(!isMatch) return res.status(400).json({ msg: 'Incorrect password!!' })

            const accesstoken = createAccessToken({ id: customer._id })
            const refreshtoken = createRefreshToken({ id: customer._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/customer/refreshtoken'
            })

            return res.status(200).json({ success: true, accesstoken })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: async (req, res) => {
        try {
            const token = req.cookies.refreshtoken
            if(!token) return res.status(400).json({ msg: 'Invalid Authentication!' })
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({ msg: 'Invalid Authentication!'})

                const accesstoken = createAccessToken({ id: user.id })
                return res.status(200).json({ success: true, accesstoken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/customer/refreshtoken' })
            res.status(200).json({ success: true, data: 'Logout successfult!'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    customerInfo: async (req, res) => {
        try {
            const user = await Customer.findById(req.user.id).select('-password')
            return res.status(200).json({ success: true, data: user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // ADMIN PART: to add, read, update or delete the customers that using the app
    createCustomers: async (req, res) => {
        try {
            const { name, password } = req.body
            if(name.length < 3) return res.status(500).json({ success: false, msg: 'The name should have at least 3 characters!' })
            if(password.length < 8) return res.status(500).json({ success: false, msg: 'The password should have at least 8 characters!' })
            
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)

            const customer = new Customer({
                name,
                password: hashedPassword
            })

            await customer.save()
            return res.status(200).json({ success: true, data: customer })

        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    readCustomers: async (req, res) => {
        try {
            const admins = await Customer.find()
            return res.status(200).json({ success: true, data: admins })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    updateCustomers: async (req, res) => {
        try {
            const { name, password } = req.body
            const { id } = req.params

            const customer = await Customer.findById({ _id: id })

            if(!customer) return res.status(500).json({ success: false, msg: `There is no customer with the id: ${id}`})
            if(name.length < 3) return res.status(500).json({ success: false, msg: 'The name should have at least 3 characters!' })
            if(password.length < 8) return res.status(500).json({ success: false, msg: 'The password should have at least 8 characters!' })
            
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)

            await Customer.findByIdAndUpdate({ _id: id }, {
                name,
                password: hashedPassword
            })

            return res.status(200).json({ success: true, msg: 'Customer updated successfully!' })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    deleteCustomers: async (req, res) => {
        try {
            const { id } = req.params
            await Customer.findByIdAndDelete({ _id: id })
            return res.status(200).json({ success: true, msg: 'Customer deleted successfully!' })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
}

const createAccessToken = (id) => {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (id) => {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = CustomerCtrl