const Mess = require('../models/mess')
const MenuItem = require('../models/menuItem')


function messvendorsHandler(_req, res) {
    console.log('entered messvendors')
    console.log("entered mess vendors")
    Mess.find({}, (err, items) => {
        if (!err && items) {
            res.json({
                result: "success",
                vendors: items.map(a => {return {'label': a.vendor, 'value': a.vendor}})
            })
        }
        else {
            res.status(500).send('An error occurred', err);
        }
    });
}

function messitemsHandler(req, res) {
    console.log('entered messitems')
    const vendor=req.params.vendor
    const day = req.params.day
    const time = req.params.time
    MenuItem.find({vendor:vendor, day:day, time:time}, (err, items) => {
        if (!err && items) {
            res.json({
                result: "success",
                menuItems: items.map(a => {return {'label': a.name, 'value': a.name}})
            });
        }
        else {
            res.status(500).send('An error occurred', err);
        }
    });
}

module.exports =  {
    messvendorsHandler,
    messitemsHandler
}