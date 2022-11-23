var mongoose=  require("mongoose")
const CanteenMenuItem=require("./canteenMenuItem.js").schema

var CanteenOrderSchema = mongoose.Schema({
    username: String,
    payment: Number,
    currBalance: Number,
    order: [CanteenMenuItem],
    pin: {type: String, default: '0000'},
    vendor:String,
    orderStatus: {type: String, default: 'wait'}
},{ timestamps: true })

module.exports = mongoose.model("CanteenOrder", CanteenOrderSchema)
