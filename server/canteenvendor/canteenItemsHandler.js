const Canteen = require('../models/canteen')

const canteenitemsFetch =async (req, res) => {
    console.log('entered canteen items')
    const vendor=req.params.vendor
    let shop = await Canteen.findOne({vendor:vendor})
    if (!shop || shop==null) {
        console.log('unable to find canteen')
        res.json({
            result: 'fail',
        })
        return
    }
    console.log(shop)
    let menu = shop.menu
    res.json({
        result: "success",
        canteenItems: menu
    });
}

const canteenitemsDelete = async (req, res) => {
    console.log('entered canteen item delete')
    const vendor=req.body.vendor
    console.log(req.body._id)
    let shop = await Canteen.findOne({vendor:vendor})
    if (!shop) {
        console.log('unable to find canteen')
        res.json({
            result: 'fail',
        })
        return
    }
    shop.menu.id(req.body._id).remove()
    shop.save()
    res.json({
        result: 'success'
    })
}

const canteenitemsModify = async (req, res) => {
    console.log('entered canteen item modify')
    const vendor=req.body.vendor
    let shop = await Canteen.findOne({vendor:vendor})
    if (!shop) {
        console.log('unable to find canteen')
        res.json({
            result: 'fail',
        })
        return
    }
    shop.menu.id(req.body._id).price = req.body.price
    shop.save()
    res.json({
        result: 'success'
    })
}

const canteenRatingModify = async (req, res) => {
    console.log('entered canteen item modify')
    const vendor=req.body.vendor
    let shop = await Canteen.findOne({vendor:vendor})
    if (!shop) {
        console.log('unable to find canteen')
        res.json({
            result: 'fail',
        })
        return
    }
    shop.menu.id(req.body._id).rating = req.body.rating
    shop.save()
    res.json({
        result: 'success'
    })
}
module.exports =  {
    canteenitemsFetch,
    canteenitemsDelete,
    canteenitemsModify,
    canteenRatingModify
}