const express = require("express")
const { canteenvendorsHandler } = require("./canteenvendorsHandler")
const {canteenitemsFetch, canteenRatingModify} = require('../canteenvendor/canteenItemsHandler')
const {authenticateHandler, hashHandler, hashcompHandler} = require("../authenticateHandler")
const {submitOrderHandler, getOrderHandler} = require('./canteenOrderHandler')
const router = express.Router()


router.get('/getmenu/:vendor', canteenitemsFetch)
router.get('/getvendors', canteenvendorsHandler)
router.post('/confirmorder', hashHandler, submitOrderHandler)
router.get('/getorders/:user', hashHandler, getOrderHandler)
router.post('/updateitem', canteenRatingModify)
module.exports = router