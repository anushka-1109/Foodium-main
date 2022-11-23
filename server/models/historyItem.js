var mongoose=  require("mongoose")

var HistoryItemSchema = mongoose.Schema({
    dateTime: String,
    payment: Number,
    currBalance: Number,
    vendor: String
},{ timestamps: true })

module.exports = mongoose.model("HistoryItem", HistoryItemSchema)
