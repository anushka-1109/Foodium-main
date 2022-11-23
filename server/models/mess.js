var mongoose=  require("mongoose")

var MessSchema = mongoose.Schema({
    vendor: String,
    username: String,
    phone: String, 
    email: String,
    breakfast: Number,
    lunch: Number,
    dinner: Number,
    pin: Number
})

module.exports = mongoose.model("Mess", MessSchema)
