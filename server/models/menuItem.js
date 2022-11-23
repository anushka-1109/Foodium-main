var mongoose = require('mongoose');
  
var MenuItemSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    vendor: {type: String, default: ""},
    desc: {type: String, default: "Normal"},
    quality: {type: Number, default: 0}, 
    health: {type: Number, default: 0},
    time: {type: String},
    day: {type: String},
    image :String
}, { timestamps: true });
  
//Image is a model which has a schema imageSchema
  
module.exports = mongoose.model('MenuItem', MenuItemSchema);