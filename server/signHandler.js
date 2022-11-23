const User = require('./models/user')
const Mess = require('./models/mess')
const Canteen = require('./models/canteen')
const passport = require('passport')
const customStrategy = require('passport-custom')
const CryptoJS = require("crypto-js");
const signStrategy = new customStrategy(
    function (req, done) {
        let pass = CryptoJS.AES.decrypt(req.body.password, 'my-secret-key@123');
        pass = pass.toString(CryptoJS.enc.Utf8)
        User.authenticate()(req.body.username, pass, (error, fnd) => {
            if (error == null) {

                done(error, fnd)
            } else {
                done(error, null)
            }
        })
    }
)

const signoutHandler =  (req, res) => {
    console.log('entered logout')
    if (req.isAuthenticated()) {
        console.log(req.user)
        req.logOut();
        res.json({
            result:"success-logout"
        })
    } else {
        res.json({
            result:'success-logout'
        })
    }
}

const signinHandler = (req, res) => {
    console.log('entered signin')
    User.findOne({username: req.user.username}, (err, user)=> {
        if (err || !user) {
            res.json({
                result: 'fail-unable'
            })
            console.log('unable to find')
            return
        } 
        console.log('jwt ', req.headers.hashing)
        user.jwt = req.headers.hashing
        user.save()
        
        // console.log(user)
        res.json({
            result: "success"
        })
    })
}
passport.use(signStrategy)

const signupHandler = (req, res) => {
    console.log('entered signup')
    var balance = 0;
    let pass = CryptoJS.AES.decrypt(req.body.password, 'my-secret-key@123');
    pass = pass.toString(CryptoJS.enc.Utf8)
    console.log(pass)
    User.register(new User({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        agreement: req.body.agreement,
        position: req.body.position,
        balance: balance
    }), pass, function (err, newUser) {
        if (err) {
            console.log(err)
            res.json({
                result: "error",
                nav: "/sign-up",
                error: err,
                src: "signup"
            })
        } else {
            newUser.jwt = req.headers.hashing
            newUser.save()
            switch (req.body.position) {
                case 'Mess Vendor':
                    Mess.create({
                        vendor: req.body.username,
                        username: req.body.username,
                        phone: req.body.phone,
                        email: req.body.email,
                        breakfast: 0,
                        lunch: 0,
                        dinner: 0,
                        pin: 1000
                    })
                    break;
                case 'Canteen Vendor':
                    Canteen.create({
                        vendor: req.body.username,
                        username: req.body.username,
                        phone: req.body.phone,
                        email: req.body.email
                    })
                    break;
                case 'Admin':
                    break;
                default:
                    break;
            }
            passport.authenticate("custom")
                (req, res, () => {
                    res.json({
                        result: "success",
                        nav: "/secret",
                        src: "signup"
                    })
                })
        }
    });
    
}

const failHandler = (req, res) => {
    console.log('entered fail')
    res.json({
        result: "fail"
    })
}

module.exports = {
    signinHandler,
    signupHandler,
    signoutHandler,
    failHandler
}