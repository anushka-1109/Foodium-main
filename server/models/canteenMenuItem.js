var mongoose = require('mongoose');
  
var CanteenMenuItem = mongoose.Schema({
    name: {type: String, default: ""},
    vendor: {type: String, default: ""},
    desc: {type: String, default: "Normal"},
    rating: {type: Number, default: 0},
    available: {type: Boolean, default: true}, 
    image :{type: String, default: ""},
    price: {type: Number, default: 0}
}, { timestamps: true });
  
//Image is a model which has a schema imageSchema
  
module.exports = mongoose.model('CanteenMenuItem', CanteenMenuItem);