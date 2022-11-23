var mongoose=  require("mongoose")

var FeedbackSchema = mongoose.Schema({
    vendorName: {type: String, default: ""},
    slotName: {type: String, default: ""},
    name: {type: String, default: ""},
    date: { type: Date, default: Date.now },
    rating: {type: String, default: ""},
    clean: {type: Number, default: 0},
    speed: {type: Number, default: 0},
    taste: {type: Number, default: 0},
    overallFood: {type: Number, default: 0},
    overallService: {type: Number, default: 0},
    comment: {type: String, default: ""}
})
module.exports = mongoose.model("Feedback", FeedbackSchema)