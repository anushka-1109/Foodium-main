const User = require('./models/user')

const authenticateHandler = (req, res) => {
    console.log("entered " + "/authenticate")
    if (req.isAuthenticated()) {
        console.log('logged in authenticate')
        res.json({
            result: "success",
            username: req.user.username,
            position: req.user.position,
            src: "auth" 
        })
    } else {
        console.log('not logged')
        res.json({
            result: "error",
            src: "auth"
        })
    }
    console.log("exited " + "/authenticate")
}

const hashHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findOne({username: req.user.username}, (err, user)=> {
            if (err || !user) {
                console.log('failed hashing')
                req.logOut();
                res.json({
                    result: 'error'
                })
                return
            } 
            if (user.jwt===req.headers.hashing) {
                console.log('checked hashing successful')
                next()
            } else {
                console.log('failed match')
                req.logOut();
                res.json({
                    result: 'error'
                })
                
            }
        })
    } else {
        console.log('no user')
        res.json({
            result: 'error'
        })
    }
}

const hashcompHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findOne({username: req.user.username}, (err, user)=> {
            if (err || !user) {
                console.log('failed hashing')
                req.logOut();
                res.json({
                    result: 'error'
                })
                return
            } 
            if (user.jwt===req.headers.hashing) {
                console.log('checked hashing successful')
                
                res.json({
                    result: "success",
                    username: req.user.username,
                    position: req.user.position,
                    balance: req.user.balance,
                    src: "hashcomp" 
                })
                next()
            } else {
                console.log('failed match')
                req.logOut();
                res.json({
                    result: 'error'
                })
                
            }
        })
    } else {
        console.log('no user')
        res.json({
            result: 'error'
        })
    }
}
module.exports =  {authenticateHandler, hashHandler, hashcompHandler}