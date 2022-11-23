const CanteenOrder = require('../models/canteenOrder')
const Canteen = require('../models/canteen')
const User = require('../models/user')
const submitOrderHandler = async (req, res) => {
    let vendor = req.body.vendor
    let cart = req.body.cart
    let user = req.body.username
    let fndUser = await User.find({username:user})
    let shop =await Canteen.find({vendor: vendor})
    if (fndUser===[] || !fndUser || shop===[] || !shop) {
        res.json({
            result: 'fail'
        })
        return
    }
    shop = shop[0]
    fndUser = fndUser[0]
    let val = 0
    let orderitems = []
    cart.forEach(el => {
        val += el.price*el.qt
        if (el.qt>0) {
            let orderitem = shop.menu.id(el.id)
            for (let i=0; i<el.qt; i++)
                orderitems.push(orderitem)
        }
    });
    CanteenOrder.create({
        username: user,
        payment: val,
        currBalance: fndUser.balance-val,
        order: orderitems,
        vendor: vendor,
        pin: req.body.pin
    })
    fndUser.balance = fndUser.balance - val
    fndUser.save()
    res.json({
        result: 'success'
    })
}

const getOrderHandler = async (req, res) => {
    let user = req.params.user
    
    let orders = await CanteenOrder.find({username: user})
    if (!orders|| orders===null) {
        res.json({
            result: 'fail'
        })
        return
    }
    orders.reverse()
    res.json({
        result: 'success',
        orders: orders
    })
}
module.exports = {
    submitOrderHandler,
    getOrderHandler
}