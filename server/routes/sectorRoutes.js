const SectorCtrl = require('../controllers/sectorCtrl')
const adminAuth = require('../midlewares/adminAuth')
const auth = require('../midlewares/auth')

const router = require('express').Router()

router.route('/')
    .get(auth, SectorCtrl.read)
    .post(auth, adminAuth, SectorCtrl.create)

router.route('/:id')
    .get(auth, adminAuth, SectorCtrl.readOne)
    .put(auth, adminAuth, SectorCtrl.update)
    .delete(auth, adminAuth, SectorCtrl.delete)

module.exports = router