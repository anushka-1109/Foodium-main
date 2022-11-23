const Canteen = require('../models/canteen')
const addMenuItem = async (req, res) => {
    let shop = await Canteen.findOne(
        {vendor: req.body.vendor},
    )
    // console.log(shop)
    if (!shop) {
        console.log('unable to find canteen')
        res.json({
            result: 'fail',
        })
    }
    shop.menu.push(req.body)
    shop.save()
    res.json({
        result: 'success'
    })
}

module.exports = {
    addMenuItem
}