const Announcement = require('./models/announcement')

const announcementHandler = (req, res) => {
    console.log(req.body)
    Announcement.create(
        req.body, (err, doc) => {
            if (err || doc == null) {
                console.log(err)
                console.log(doc)
                res.json({
                    result: 'fail'
                })
            } else {
                console.log('announced successfully')
                res.json({
                    result: "success"
                })
            }
        }
    )
}

const fetchAnnouncementHandler = (_req, res) => {
    function isDayOver(item){
        console.log(item)
        let currDate = new Date()
        let diff = currDate - item.createdAt
        return diff <= 1000 * 60 * 60 * 24
    }
    Announcement.find({}, (err, items) =>{
        if (!err && items) {
            console.log(items)
            items = items.filter(isDayOver)
            res.json({
                result: "success",
                announcement : items.map(a => {return {'title': a.title, 
                description: a.description, 
                date:`${a['createdAt'].getDate()}/${a['createdAt'].getMonth() + 1}/${a['createdAt'].getFullYear()}`,
                time:`${a['createdAt'].getHours()}:${a['createdAt'].getMinutes()}`}})
            })
        }
        else {
            res.status(500).send('An error occurred', err);
        }
    })
}

module.exports = {
    announcementHandler, 
    fetchAnnouncementHandler
}