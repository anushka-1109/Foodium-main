const Feedback = require('../models/feedback')

const livereviewHandler = (req, res)=> {
    console.log('entered livereview')
    const mess=req.params.param1
    console.log("live review entered")
    console.log(mess)
    Feedback.find({vendorName:mess}, (err, items) => {
        if (!err && items) {
            res.json({
                result: "success",
                reviews: items
            });
        }
        else {
            res.status(500).send('An error occurred', err);
        }
    });
}

module.exports =  livereviewHandler