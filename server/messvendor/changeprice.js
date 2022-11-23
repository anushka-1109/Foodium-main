const Mess = require('../models/mess')

const findPrices = (req, res) => {
    console.log('entered findPrices')
    const messval=req.params.param1
    console.log(messval)
    Mess.findOne({
        username: messval
    }, (err, vendor)=> {
        if (!err && vendor) {
            res.json({
                result: "success",
                data: vendor.vendor,
                breakPrice: vendor.breakfast,
                lunchPrice: vendor.lunch,
                dinnerPrice: vendor.dinner
            })
        } else {
            res.json({
                result:"fail",
                data: "unknown"
            })
        }
    })
}

const changePrices = (req, res) => {
    console.log('entered findPrices')
    const messval=req.body.username
    console.log(messval)
    Mess.findOne({
        username: messval
    }, (err, vendor) => {
        if (!err && vendor) {
            console.log(req.body)
            vendor[req.body.type] = req.body.amt
            vendor.save()
            res.json({
                result: "success",
                data: vendor.vendor,
            })
        } else {
            res.json({
                result:"fail",
                data: "unknown"
            })
        }
    })
}
module.exports = {
    findPrices,
    changePrices
}