const Feedback = require('../models/feedback')
const feedbackHandler = (req, res) => {
    console.log('entered feedback')
    req.body.date = new Date(req.body.date)
    console.log(typeof req.body.date)
    Feedback.create(
        req.body, (err, doc) => {
            if (err || doc == null) {
                console.log(err)
                console.log(doc)
                res.json({
                    result: 'fail'
                })
            } else {
                console.log('feedback success')
                res.json({
                    result: "success"
                })
            }
        }
    )
}
module.exports =  feedbackHandler