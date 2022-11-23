const User = require('../models/user');

const historyHandler = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user.username;
        User.findOne({
                username: user
            }, (err, currUser) => {
                if (!err && currUser) {
                    const payments = currUser.canteenPayments
                    console.log(payments)
                    console.log("find the order history")
                    let all_payments = payments.map((item,index)=>{
                        return {
                            key:index,                            
                            order_id:item['_id'],
                            date:`${item['createdAt'].getDate()}/${item['createdAt'].getMonth() + 1}/${item['createdAt'].getFullYear()}`,
                            time:`${item['createdAt'].getHours()}:${item['createdAt'].getMinutes()}`,                            
                            payment:item['payment'],
                            balance:item['currBalance'],
                            order: item['order'],
                            vendor:item['vendor'],
                            status: item['orderstatus']
                        }
                    })
                    console.log(all_payments)
                    all_payments.reverse()
                    res.json({                        
                        result: "success",
                        payments: all_payments,
                        src: "payment history"
                    })

                } else {
                    console.log('Error in payment history')
                    res.json({
                        result: "error",
                        src: "payment history"
                    })
                }
            }

        )
    } else {
        console.log('Error in payment history')
        res.json({
            result: "error",
            src: "payment history"
        })
    }
}

// const payEatHandler = async (req, res) => {
//     console.log('entered payeat')
//     if (req.isAuthenticated()) {
//         const now = new Date();
//         const hour = now.getHours()
//         const stringDateTime = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
//         console.log(req.user)
//         const user = req.user.username;
//         const Canteenval = req.body.pin;
//         console.log(Canteenval)
//         const vendor = await Canteen.findOne({
//             pin: Canteenval
//         })
//         if (!vendor) {
//             console.log('Canteen not found')
//             res.json({
//                 result: "error",
//                 src: "auth"
//             })
//             return
//         }

//         const currUser = await User.findOne({
//             username: user
//         })
//         if (!currUser) {
//             console.log('Canteen not found')
//             res.json({
//                 result: "error",
//                 src: "auth"
//             })
//             return
//         }

//         const payment = hour <= 10 ? vendor.breakfast : (hour <= 16 ? vendor.lunch : vendor.dinner)
//         currUser.balance -= payment
//         console.log('logged In')
//         currUser.payments.push({
//             dateTime: stringDateTime,
//             payment: payment,
//             currBalance: currUser.balance,
//             vendor: vendor.vendor
//         });
//         currUser.save();
//         res.json({
//             result: "success",
//             date: stringDateTime,
//             data: vendor.vendor,
//             src: "auth"
//         })
//     } else {
//         res.json({
//             result: "error",
//             src: "auth"  
//         })
//     }
// }

module.exports = {
    historyHandler,
    // payEatHandler
};
