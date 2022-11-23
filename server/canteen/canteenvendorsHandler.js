const Canteen = require('../models/canteen')

function canteenvendorsHandler(_req, res) {
    console.log('entered canteen vendors')
    Canteen.find({}, (err, items) => {
        if (!err && items) {
            res.json({
                result: "success",
                vendors: items.map(e => e.vendor)
            })
        }
        else {
            res.status(500).send('An error occurred', err);
        }
    });
}



module.exports =  {
    canteenvendorsHandler,
    
}