const Sector = require("../models/sectorModel")

const SectorCtrl = {
    create: async (req, res) => {
        try {
            const { name } = req.body
            if(name.length === 0) return res.status(500).json({ success: false, msg: "Please enter a sector name!" })
            const sector = await Sector.findOne({ name: name })

            if(sector) return res.status(500).json({ success: false, msg: "This sector is already in the database!" })

            const newSector = new Sector({ name })
            await newSector.save()

            return res.status(200).json({ success: true, data: newSector })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    read: async (req, res) => {
        try {
            const sectors = await Sector.find()
            return res.status(200).json({ success: true, data: sectors })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    readOne: async (req, res) => {
        try {
            const { id } = req.params
            const sectors = await Sector.findById({ _id: id })
            return res.status(200).json({ success: true, data: sectors })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            
            if(name.length === 0) return res.status(500).json({ success: false, msg: "Please enter a sector name!" })
            
            const sector = await Sector.findOne({ name: name })
            if(sector) return res.status(500).json({ success: false, msg: "This sector is already in the database!" })

            await Sector.findByIdAndUpdate({ _id: id }, { name })

            return res.status(200).json({ success: true, msg: "Sector updated successfully!" })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Sector.findByIdAndDelete({ _id: id })
            return res.status(200).json({ success: true, msg: 'Sector deleted successfully!' })
        } catch (error) {
            return res.status(400).json({ success: false, msg: error.message })
        }
    },
}

module.exports = SectorCtrl