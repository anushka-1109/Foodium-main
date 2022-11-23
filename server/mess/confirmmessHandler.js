const Mess = require('../models/mess')

const confirmmessHandler = (req, res) => {
    console.log('entered confirmmess')
    const messval=req.params.param1
    console.log("live menu entered")
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

module.exports = confirmmessHandler