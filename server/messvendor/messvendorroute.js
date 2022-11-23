const express = require("express")
const router = express.Router()
const { confirmmessHandler, changepinHandler } = require("./changepin")
const {authenticateHandler, hashHandler, hashcompHandler} = require('../authenticateHandler')
const feedbackHandler = require("../mess/feedbackHandler")
const {findPrices, changePrices} = require("./changeprice")
const {announcementHandler} = require('../announcementHandler')

router.get('/confirmmess/:param1', hashHandler, confirmmessHandler)
router.get('/getprice/:param1', hashHandler, findPrices)

router.post('/changepin', hashHandler, changepinHandler)
router.post('/changeprice', changePrices)
router.post('/postannouncement', hashHandler, announcementHandler)
module.exports = router