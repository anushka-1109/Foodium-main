const Mess = require('../models/mess')

const confirmmessHandler = (req, res) => {
    console.log('entered confirmmess')
    const messval=req.params.param1
    console.log(messval)
    Mess.findOne({
        pin: messval
    }, (err, vendor)=> {
        if (!err && vendor) {
            res.json({
                result: "success",
                data: vendor.vendor
            })
        } else {
            res.json({
                result:"success",
                data: "unknown"
            })
        }
    })
}

const changepinHandler = (req, res) => {
    console.log('entered changepin')
    const messval=req.body.oldpin
    const newpin = req.body.newpin
    console.log(messval)
    Mess.findOne({
        pin: messval
    }, (err, vendor)=> {
        if (!err && vendor) {
            vendor.pin = newpin
            vendor.save()
            res.json({
                result: "success",
                data: vendor.vendor
            })
        } else {
            res.json({
                result:"success",
                data: "unknown"
            })
        }
    })
}

module.exports = {
    confirmmessHandler,
    changepinHandler
}
