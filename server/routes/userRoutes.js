const UserCtrl = require('../controllers/userCtrl')
const adminAuth = require('../midlewares/adminAuth')
const auth = require('../midlewares/auth')

const router = require('express').Router()

router.route('/')
    .get(auth, UserCtrl.readAll)
    .post(auth, UserCtrl.create)

router.route('/:id')
    .get(auth, UserCtrl.readOne)
    .put(auth, UserCtrl.update)
    .delete(auth, UserCtrl.delete)


module.exports = router