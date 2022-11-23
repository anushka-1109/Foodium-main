var mongoose =  require("mongoose")
var AnnouncementSchema = mongoose.Schema({
    title: String, 
    description: String, 
},  { timestamps: true })

module.exports = mongoose.model("Announcement", AnnouncementSchema)
