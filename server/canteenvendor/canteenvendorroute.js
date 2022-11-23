const express = require("express")
const { addMenuItem } = require("./addmenuitem")
const { canteenitemsDelete, canteenitemsModify } = require("./canteenItemsHandler")
const {authenticateHandler, hashHandler, hashcompHandler} = require("../authenticateHandler")
const {orderStatusHandler, getOrderHandler} = require('./orderStatusHandler')
const router = express.Router()

router.post('/addmenuitem', addMenuItem)
router.post('/deleteitem', canteenitemsDelete)
router.post('/changeprice', canteenitemsModify)
router.post('/orderstatus',  orderStatusHandler)
router.get('/getorders/:vendor', getOrderHandler)
module.exports = router