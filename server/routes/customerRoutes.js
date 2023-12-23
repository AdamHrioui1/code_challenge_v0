const CustomerCtrl = require('../controllers/customerCtrl')
const adminAuth = require('../midlewares/adminAuth')
const auth = require('../midlewares/auth')

const router = require('express').Router()

router.post('/register', CustomerCtrl.register)
router.post('/login', CustomerCtrl.login)
router.get('/refreshtoken', CustomerCtrl.refreshtoken)
router.get('/logout', CustomerCtrl.logout)
router.get('/info', auth, CustomerCtrl.customerInfo)


router.route('/')
    .get(auth, adminAuth, CustomerCtrl.readCustomers)
    .post(auth, adminAuth, CustomerCtrl.createCustomers)

router.route('/:id')
    .put(auth, adminAuth, CustomerCtrl.updateCustomers)
    .delete(auth, adminAuth, CustomerCtrl.deleteCustomers)

module.exports = router