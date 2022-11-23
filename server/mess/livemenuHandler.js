const MenuItem = require('../models/menuItem')

const livemenuHandler = (req, res) => {
    console.log('entered livemenu')
    const vendor=req.params.vendor
    const day = req.params.day
    const time = req.params.time
    console.log("live menu entered")
    console.log(vendor)
    MenuItem.find({vendor:vendor, day:day, time:time}, (err, items) => {
        if (!err && items) {
            res.json({
                result: "success",
                menuItems: items
            });
        }
        else {
            res.status(500).send('An error occurred', err);
        }
    });
}

const uploadimageHandler = (req, res) => {
    console.log("entered uploadimage")
    let obj = req.body 
    console.log(req.body)
    MenuItem.create(obj, (err, _item) => {
        if (err) {
            console.log("entered error")
            console.log(err);
            res.json({
                result:"fail"
            })
        }
        else {
            console.log("entered success")
            res.json({
                result:'success'
            })
        }
    });
}

const updateimageHandler = (req, res) => {
    console.log("entered uploadimage")
    let obj = req.body 
    console.log(req.body)
    MenuItem.findOne({name:obj.name, vendor:obj.vendor}, (err, item) => {
        if (err) {
            console.log("entered error")
            console.log(err);
            res.json({
                result:"fail"
            })
        }
        else {
            console.log("entered success")
            item.quality = obj.quality
            item.health = obj.health
            item.image = obj.image
            item.desc = obj.desc
            item.save()
            res.json({
                result:'success'
            })
        }
    });
}
const deleteItemHandler =async (req, res) => {
    console.log("entered delete menu item")
    console.log(req.body)
    await MenuItem.deleteOne({_id: req.body._id})
    res.json({
        result:'success'
    })
}
module.exports =  {
    livemenuHandler,
    uploadimageHandler,
    updateimageHandler,
    deleteItemHandler
}